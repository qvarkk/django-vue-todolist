from django.urls import path

from .views import ListCreateTasks, DeleteUpdateRetrieveTask, UsersTasksView

urlpatterns = [
    path('tasks/', ListCreateTasks.as_view(), name='task-list-create'),
    path('tasks/<int:pk>/', DeleteUpdateRetrieveTask.as_view(), name='task-delete-update-retrieve'),
    path('users/tasks/', UsersTasksView.as_view(), name='user-tasks'),
]