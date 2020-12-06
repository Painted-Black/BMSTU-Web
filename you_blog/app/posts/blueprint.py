from flask import render_template
from flask import request
from flask import Blueprint
from flask import redirect
from flask import url_for
from models import Post, Tag, Comment
from .forms import PostForm, CommentForm
from app import db
from flask_security import login_required
from wtforms_appengine.db import model_form

posts = Blueprint('posts', __name__, template_folder='templates')

@posts.route('/blog/<slug>/comment', methods=['POST', 'GET'])
def add_comment(slug):
	post = Post.query.filter(Post.slug == slug).first_or_404()
	if request.method == 'POST':
		id = post.id
		name = request.form['name']
		body = request.form['body']
		email = request.form['email']
		try:
			comment = Comment(name=name, email=email, body=body, post=id)
			db.session.add(comment)
			db.session.commit()
		except Exception as e:
			print("Unable to add new comment in database")
		return redirect( url_for('posts.post_detail', slug=slug) )
	form = CommentForm()
	return render_template('posts/add_comment.html', form=form, post=post)

@posts.route('/blog/new', methods=['POST', 'GET'])
@login_required
def create_post():
	#print(request.method)
#	json_data = request.json
	if request.method == 'POST':
		title = request.form.get('title')
		body = request.form.get('body')
		#body = request.form['body']
		try:
			post = Post(title=title, body=body)
			db.session.add(post)
			db.session.commit()
		except Exception as e:
			print("Unable to add new post in database")
		return redirect( url_for('posts.index') )
	form = PostForm()
	return render_template('posts/create_post.html', form=form)

@posts.route('/blog', methods=['GET'])
def index():
	q = request.args.get('q')
	page = request.args.get('page')
	if page and page.isdigit():
		page = int(page)
	else:
		page = 1

	if q:
		posts = Post.query.filter(Post.title.contains(q) | Post.body.contains(q))#.all()
	else:
		posts = Post.query.order_by(Post.created.desc())

	pages = posts.paginate(page=page, per_page=5)
	return render_template('posts/index.html', posts=posts, pages=pages)

@posts.route('/blog/<slug>/edit', methods=['GET', 'PUT', 'PATCH'])
@login_required
def edit_post(slug):
	print("EDIT : ", request.method)
	print(request.form)
	post = Post.query.filter(Post.slug == slug).first_or_404()
	if request.method == 'PUT':
		form = PostForm(formdata=request.form, obj=post)
		form.populate_obj(post)
		db.session.commit()
		return redirect( url_for("posts.post_detail", slug=post.slug))
		# return render_template('posts/post_detail.html', post=post)
	form = PostForm(obj=post)
	return render_template('posts/edit_post.html', post=post, form=form)

@posts.route('/blog/<slug>', methods=['GET', 'PUT'])
def post_detail(slug):
	post = Post.query.filter(Post.slug == slug).first_or_404()
	tags = post.tags
	return render_template('posts/post_detail.html', post=post,tags=tags)

@posts.route('/blog/tag/<slug>')
def tag_detail(slug):
	tag = Tag.query.filter(Tag.slug == slug).first_or_404()
	posts = tag.posts.all()
	return render_template('posts/tag_detail.html', tag=tag, posts=posts)

