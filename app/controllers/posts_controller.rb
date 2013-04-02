class PostsController < ApplicationController

	def index
		posts = [{
			id: 1,
			title: 'Rails is Omakase',
			author: 'd2h',
			publishedAt: Date.new(2012, 12, 27),
			intro: 'There are lots of a la blah blah',
			extended: 'I want this for my ORM'
		}, {
			id: 2,
			title: 'The Parley Letter',
			author: 'd2h',
			publishedAt: Date.new(2012, 12, 24),
			intro: 'My [appearance on the Ruby](http://www.attacklab.net/)',
			extended: 'A long list ..'
		}]
		render json: {posts: posts}
	end

end
