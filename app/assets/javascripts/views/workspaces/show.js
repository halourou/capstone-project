//MyTasks will load on sign in, eventually
AsanaClone.Views.WorkspaceShow = Backbone.CompositeView.extend({
  template: JST['workspaces/show'],

  initialize: function (options) {
    this.current_user_id = options.current_user_id
    this.collection = this.model.projects();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model, "sync", this.renderProjectForm);
    this.listenTo(this.collection, "add", this.displayProjectLink);

    this.collection.forEach(function(project) {
      this.displayProjectLink(project);
    }.bind(this))
  },

  events: {
    "click .project-link": "renderProjectShow",
    "click .task-detail": "renderTaskDetail"
  },

  render: function () {
    var renderedContent = this.template({workspace: this.model});

    this.$el.html(renderedContent);
    this.attachSubviews();
    // this.renderProjectForm();
    return this;
  },

  displayProjectLink: function (project) {
    var subview = new AsanaClone.Views.ProjectLinkItem({
      collection: this.model,
      model: project
    });
    this.addSubview('#projects', subview);
  },

  renderProjectForm: function () {
    var view = new AsanaClone.Views.ProjectForm({
      collection: this.collection
    });
    this.addSubview('#project-form', view);
  },

  renderProjectShow: function (e) {
    e.preventDefault();
    $target = $(e.currentTarget);
    var project = this.collection.get($target.data('id'))
    var view = new AsanaClone.Views.ProjectShow({
      model: project,
      current_user_id: this.current_user_id
    });

    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.addSubview('#project-show', view);
  },

  renderTaskDetail: function (e) {
    e.preventDefault();
    $target = $(e.currentTarget);
    //need the specific task and tasks collection

    var project = this.collection.getOrFetch($target.data('project-id'))
    var tasks = project.tasks();

    var taskID = $target.data('task-id');

    var subview = new AsanaClone.Views.TaskShow({
      collection: tasks,
      taskID: taskID
    });

    this._subCurrentView && this._subCurrentView.remove();
    this._subCurrentView = subview;
    this.addSubview('#task-detail-show', subview);
  }
})