orion.collections.onCreated(function() {
  var self = this;

  /**
   * Collection permissions
   */
  Roles.registerAction('collections.' + this.name + '.index', true);
  Roles.registerAction('collections.' + this.name + '.showCreate', true);
  Roles.registerAction('collections.' + this.name + '.showUpdate', true);
  Roles.registerAction('collections.' + this.name + '.showRemove', true);
  Roles.registerHelper('collections.' + this.name + '.indexFilter', {});
  Roles.registerHelper('collections.' + this.name + '.hiddenFields', []);

  this.attachRoles('collections.' + this.name);

  if (Meteor.isClient) {
    this.canIndex = function() {
      return Roles.userHasPermission(Meteor.userId(), 'collections.' + self.name + '.index');
    };
    this.canShowCreate = function() {
      return Roles.userHasPermission(Meteor.userId(), 'collections.' + self.name + '.showCreate');
    };
    this.getHiddenFields = function() {
      return _.union.apply(this, Roles.helper(Meteor.userId(), 'collections.' + self.name + '.hiddenFields'));
    }
    this.helpers({
      canShowUpdate: function () {
        return Roles.userHasPermission(Meteor.userId(), 'collections.' + self.name + '.showUpdate', this);
      },
      canShowRemove: function() {
        return Roles.userHasPermission(Meteor.userId(), 'collections.' + self.name + '.showRemove', this);
      }
    });
  }
});
