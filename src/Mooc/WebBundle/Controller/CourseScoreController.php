<?php
namespace Mooc\WebBundle\Controller;

use Topxia\Common\Paginator;
use Topxia\Common\ArrayToolkit;
use Symfony\Component\HttpFoundation\Request;

class CourseScoreController extends BaseController
{
    public function scoreSettingAction(Request $request, $courseId)
    {
        $user = $this->getCurrentUser();

        if (!$user->isLogin()) {
            throw $this->createAccessDeniedException('未登录用户，无权操作！');
        }

        $course = $this->getCourseService()->getCourse($courseId);

        if ('periodic' != $course['type']) {
            throw $this->createNotFoundException("不是周期课程，没有该功能模块!");
        }

        $scoreSetting = $this->getCourseScoreService()->getScoreSettingByCourseId($courseId);

        if ($request->getMethod() == "POST") {
            $postDates = $request->request->all();

            if (isset($scoreSetting)) {
                $scoreSetting = $this->getCourseScoreService()->updateScoreSetting($courseId, $postDates);
            } else {
                $postDates['courseId'] = $courseId;
                $scoreSetting          = $this->getCourseScoreService()->addScoreSetting($postDates);
            }

            if ($this->getWeight($scoreSetting) == 0) {
                $this->setFlashMessage('warning', '成绩权重未设置，将会影响最终成绩核算！');
            } else {
                $this->setFlashMessage('success', '课程评分信息已保存！');
            }
        }

        $endTime = $course['endTime'] + (24 * 60 * 60);

        return $this->render('TopxiaWebBundle:CourseScore:setting.html.twig', array(
            'course'       => $course,
            'classEndTime' => $endTime,
            'score'        => $scoreSetting
        ));
    }

    private function getWeight($scoreSetting)
    {
        $totoalWeight = $scoreSetting['examWeight'] + $scoreSetting['homeworkWeight'] + $scoreSetting['otherWeight'];
        return $totoalWeight;
    }

    public function scorePublishedAction(Request $request, $courseId)
    {
        $data   = array('msg' => '', 'type' => 'danger');
        $course = $this->getCourseService()->getCourse($courseId);

        if ('published' != $course['status']) {
            $data['msg'] = "课程未发布,不能发布成绩！";
        }

        $scoreSetting = $this->getCourseScoreService()->getScoreSettingByCourseId($courseId);

        if (!$this->container->get('topxia.timemachine')->inSameDay($scoreSetting['expectPublishTime'], time())) {
            $data['msg'] = "未到课程预期发布时间，不能发布成绩！";
        }

        $postDates = array('status' => 'published');

        if ($this->getCourseScoreService()->updateScoreSetting($courseId, $postDates)) {
            $data['type'] = 'success';
            $data['msg']  = "课程成绩发布成功！";
        }

        return $this->createJsonResponse($data);
    }

    public function scoreEditAction(Request $request)
    {
        $id         = $request->request->get('id');
        $otherScore = $request->request->get('otherScore');

        $fields = array(
            'otherScore'    => $otherScore,
            'courseScoreId' => $id
        );
        $userScore          = $this->getCourseScoreService()->updateUserCourseScore($id, $fields);
        $courseScoreSetting = $this->getCourseScoreService()->getScoreSettingByCourseId($userScore['courseId']);

        if ($userScore) {
            return $this->createJsonResponse(array('userScore' => $userScore, 'courseScoreSetting' => $courseScoreSetting));
        }
    }

    public function transcriptsAction(Request $request, $courseId)
    {
        $course = $this->getCourseService()->tryManageCourse($courseId);

        if ('periodic' != $course['type']) {
            throw $this->createNotFoundException("不是周期课程，没有该功能模块!");
        }

        //transcriptsHeader
        list($studentNum, $passStudentNum, $averageScore, $passingRate) = $this->getCourseOverview($courseId);
        //transcripts
        $course                                                                                   = $this->getCourseService()->getCourse($courseId);
        list($users, $usersProfile, $usersScore, $courseScoreSetting, $organizations, $paginator) = $this->getTranscripts($request, $courseId);

        if (empty($courseScoreSetting)) {
            return $this->redirect($this->generateUrl('course_manage_score', array('courseId' => $course['id'])));
        }

        return $this->render('TopxiaWebBundle:CourseScore:transcripts.html.twig', array(
            'studentNum'         => $studentNum,
            'passStudentNum'     => $passStudentNum,
            'averageScore'       => $averageScore,
            'passingRate'        => $passingRate,
            'course'             => $course,
            'users'              => $users,
            'usersProfile'       => $usersProfile,
            'usersScore'         => $usersScore,
            'courseScoreSetting' => $courseScoreSetting,
            'organizations'      => $organizations,
            'paginator'          => $paginator
        ));
    }

    public function transcriptsListAction(Request $request, $courseId)
    {
        $course                                                                                   = $this->getCourseService()->tryManageCourse($courseId);
        list($users, $usersProfile, $usersScore, $courseScoreSetting, $organizations, $paginator) = $this->getTranscripts($request, $courseId);
        return $this->render('TopxiaWebBundle:CourseScore:transcripts_list.html.twig', array(
            'users'              => $users,
            'usersProfile'       => $usersProfile,
            'usersScore'         => $usersScore,
            'course'             => $course,
            'courseScoreSetting' => $courseScoreSetting,
            'organizations'      => $organizations,
            'paginator'          => $paginator
        ));
    }

    public function studentGradesCardsAction(Request $request, $courseId, $userId)
    {
        $course = $this->getCourseService()->tryManageCourse($courseId);

        $courseSetting = $this->getCourseScoreService()->getScoreSettingByCourseId($courseId);

        if ('published' != $courseSetting['status']) {
            throw $this->createNotFoundException("课程成绩尚未发布!");
        }

        $user        = $this->getUserService()->getUser($userId);
        $userProfile = $this->getUserService()->getUserProfile($userId);

        $course            = $this->getCourseService()->getCourse($courseId);
        $courseMember      = $this->getCourseService()->getCourseMember($courseId, $user['id']);
        $learnedLessonsNum = $courseMember['learnedNum'];

        $scores = $this->getCourseScoreService()->getUserScoreByUserIdAndCourseId($user['id'], $courseId);

        $testpapers   = $this->getTestpaperService()->findAllTestpapersByTarget($courseId);
        $testpaperIds = ArrayToolkit::column($testpapers, 'id');

        $testpaperResults = $this->getTestpaperService()->findUserTestpaperResultsByTestpaperIds($testpaperIds, $user['id']);
        $testpaperResults = ArrayToolkit::index($testpaperResults, 'testId');

        $homeworkResults = array();
        $homeworklessons = array();

        if ($this->isPluginInstalled('Homework')) {
            $homeworks = $this->getHomeworkService()->findHomeworksByCourseId($courseId);

            $homeworkResults = $this->getHomeworkService()->findUserResultsByCourseId($courseId, $user['id']);
            $homeworkResults = ArrayToolkit::index($homeworkResults, 'homeworkId');

            $homeworksLessonIds = ArrayToolkit::column($homeworks, 'lessonId');
            $homeworkLessons    = $this->getCourseService()->findLessonsByIds($homeworksLessonIds);
        }

        return $this->render('TopxiaWebBundle:CourseScore:student-grades-cards.html.twig', array(
            'course'            => $course,
            'learnedLessonsNum' => $learnedLessonsNum,
            'scores'            => $scores,
            'courseSetting'     => $courseSetting,
            'testpapers'        => $testpapers,
            'testpaperResults'  => $testpaperResults,
            'homeworks'         => $homeworks,
            'homeworkResults'   => $homeworkResults,
            'homeworkLessons'   => $homeworkLessons,
            'userProfile'       => $userProfile,
            'previewAs'         => 'teacher'
        ));
    }

    private function getTranscripts($request, $courseId)
    {
        $courseScoreSetting = $this->getCourseScoreService()->getScoreSettingByCourseId($courseId);

        $parameters = $request->query->all();

        if (empty($parameters) || (isset($parameters) && empty($parameters['staffNo']) && empty($parameters['organizationId']))) {
            $usersScore = $this->getCourseScoreService()->findAllMemberScore($courseId);
        } else {
            $organizationIds = $this->getOrganizationService()->findOrganizationChildrenIds($parameters['organizationId']);
            $fields          = array(
                'staffNo'         => $parameters['staffNo'],
                'organizationIds' => $organizationIds,
                'courseId'        => $courseId
            );
            $usersScore = $this->getCourseScoreService()->findUsersScoreBySqlJoinUser($fields);
        }

        $userIds = array();

        if (!empty($usersScore)) {
            $userIds    = ArrayToolkit::column($usersScore, 'userId');
            $usersScore = ArrayToolkit::index($usersScore, 'userId');
        }

        $conditions = array(
            'userIds' => $userIds
        );

        $paginator = new Paginator(
            $this->get('request'),
            $this->getUserService()->searchUserCount($conditions),
            10
        );

        $users = $this->getUserService()->searchUsers(
            $conditions,
            array('staffNo', 'ASC'),
            $paginator->getOffsetCount(),
            $paginator->getPerPageCount()
        );

        $usersProfile = array();

        if (!empty($userIds)) {
            $usersProfile = $this->getUserService()->findUserProfilesByIds($userIds);
            $usersProfile = ArrayToolkit::index($usersProfile, 'id');
        } else {
            $users = array();
        }

        $organizationIds = ArrayToolkit::column($users, 'organizationId');
        $organizations   = $this->getOrganizationService()->findOrganizationsByIds($organizationIds);

        return array(
            $users,
            $usersProfile,
            $usersScore,
            $courseScoreSetting,
            $organizations,
            $paginator
        );
    }

    private function getCourseOverview($courseId)
    {
        $studentNum = $this->getCourseService()->getCourseStudentCount($courseId);

        $passStudentNum = $this->getCourseScoreService()->getCoursePassStudentCount($courseId);

        $allMemberScore = $this->getCourseScoreService()->findAllMemberScore($courseId);

        $totalScore   = 0;
        $averageScore = 0;
        $passingRate  = 0;

        if ($allMemberScore) {
            foreach ($allMemberScore as $memberScore) {
                $totalScore += $memberScore['totalScore'];
            }

            $averageScore = round($totalScore / count($allMemberScore), 2);

            $passingRate = round($passStudentNum / $studentNum, 3) * 100;
        }

        return array($studentNum, $passStudentNum, $averageScore, $passingRate);
    }

    protected function getCourseService()
    {
        return $this->getServiceKernel()->createService('Course.CourseService');
    }

    protected function getCourseScoreService()
    {
        return $this->getServiceKernel()->createService('Mooc:Course.CourseScoreService');
    }

    protected function getOrganizationService()
    {
        return $this->getServiceKernel()->createService('Mooc:Organization.OrganizationService');
    }

    protected function getTestpaperService()
    {
        return $this->getServiceKernel()->createService('Mooc:Testpaper.TestpaperService');
    }

    protected function getHomeworkService()
    {
        return $this->getServiceKernel()->createService('Homework:Homework.HomeworkService');
    }
}
