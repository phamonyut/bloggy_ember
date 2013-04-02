App = Ember.Application.create();

App.Store = DS.Store.extend({
	revision: 11, 
	adapter: DS.RESTAdapter.extend({
		url: 'http://localhost:3000'
	})
});

App.IndexRoute = Ember.Route.extend({
	redirect: function() {
		this.transitionTo('posts');
	}
})

App.Router.map(function() {
	this.resource('about');
	this.resource('posts', function() {
		this.resource('post', {path: ':post_id'})
	});
});

App.PostsRoute = Ember.Route.extend({
	model: function() {
		return App.Post.find();
	}
});

App.PostController = Ember.ObjectController.extend({
	isEditing: false,
	edit: function() {
		this.set('isEditing', true);
		// this.get('store').commit();
	},
	doneEditing: function() {
		this.set('isEditing', false);
	}
});

App.Post = DS.Model.extend({
	title: DS.attr('string'),
	author: DS.attr('string'),
	intro: DS.attr('string'),
	extended: DS.attr('string'),
	publishedAt: DS.attr('date')
});

// App.Post.FIXTURES = [{
// 	id: 1,
// 	title: 'Rails is Omakase',
// 	author: 'd2h',
// 	publishedAt: new Date('12-27-2012'),
// 	intro: 'There are lots of a la blah blah',
// 	extended: 'I want this for my ORM'
// }, {
// 	id: 2,
// 	title: 'The Parley Letter',
// 	author: 'd2h',
// 	publishedAt: new Date('12-24-2012'),
// 	intro: 'My [appearance on the Ruby](http://www.attacklab.net/)',
// 	extended: 'A long list ..'
// }];

Ember.Handlebars.registerBoundHelper('date', function(date) {
	return moment(date).fromNow();
});

var showdown = new Showdown.converter();
Ember.Handlebars.registerBoundHelper('markdown', function(input) {
	return new Ember.Handlebars.SafeString([showdown.makeHtml(input)]);
});