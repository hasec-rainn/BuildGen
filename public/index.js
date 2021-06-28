function showModal() {
	var postModal = document.getElementById('create-post-modal')
	postModal.classList.remove('hidden')
}

function clearText() {
	var postInputElems = document.getElementsByClassName('post-input-element');
	for (var i = 0; i < postInputElems.length; i++) {
		var input = postInputElems[i].querySelector('input');
		input.value = '';
	}
}

function hideModal() {	
  var postModal = document.getElementById('create-post-modal');
  postModal.classList.add('hidden');

  clearText();
}

// Function to show the post button when BuildGen is the active tab and hide it otherwise
function toggleBuildGenButtons() {
	var genButton = document.getElementById('navbar-gen-button')
	var postButton = document.getElementById('navbar-post-button')
	var links = document.getElementsByClassName('navlink')
	
	if(links[1].classList.contains('active')) {
		postButton.classList.remove('hidden')
		genButton.classList.remove('hidden')
	} else {
		postButton.classList.add('hidden')
		genButton.classList.add('hidden')
	}
}

// function to add the 'active' token to the corresponding link
function addActive() {
	// store the navbar links
	var links = document.getElementsByClassName('navlink')
	
	// get the browser's url and split it at the forward slashes
	var url = window.location.pathname
	var urlParts = url.split('/')
	
	// iterate through the links and remove the 'active' token if they have it
	for (var i = 0; i < links.length; i++) {
		if (links[i].classList.contains('active')) {
			links[i].classList.remove('active')
		}
	}
	
	// if the url doesn't have a second part, add 'active' to the home link
	if (!urlParts[1]) {
		links[0].classList.add('active')
	}
	// otherwise, check if the second part is buildgen or othertool (has '#' at the end)
	else {
		if (urlParts[1] === 'buildgen') {
			links[1].classList.add('active')
		}
		else if (urlParts[1].charAt(urlParts[1].length - 1) === '#') {
			links[2].classList.add('active')
		}
	}
}

// Function to get the target post
function postIndex(postElement) {
	// store the posts
	var posts = document.getElementsByClassName('post')
	
	var idx = 0
	
	// iterate through the posts; if the target post matches the current post, return idx
	for (idx; idx < posts.length; idx++) {
		if(postElement === posts[idx]) {
			return idx
		}
	}
	
	// if the for loop ends, the post wasn't found, return an index of -1
	return -1
}

// Function to go to an individual post's page
function goToPost(postElement) {
	var idx = postIndex(postElement)
	
	// if the post has an invalid index (-1), return
	if (idx === -1) {
		return
	}
	
	
	// get the browser's url and split it at the forward slashes
	var url = window.location.pathname
	var urlParts = url.split('/')
	
	// concatenate the correct url for the post
	postUrl = urlParts[0] + '/post/' + idx
	
	// set the browser's url to the post
	window.location.pathname = postUrl
}

// Function to handle event delegation of the posts
function handlePostClick(event) {
	// get the post that the targed is a descendant of
	var post = event.target.closest('div.post')
	
	// if the target has a post as its ancestor, pass the post to goToPost
	if (post) {
		goToPost(post)
	}
}

//creating the post when the create post button is pressed


var postButton = document.getElementById('navbar-post-button')
if (postButton) {
	postButton.addEventListener('click', showModal)
}

var modalCloseButton = document.querySelector('#create-post-modal .modal-close-button')
if (modalCloseButton) {
	modalCloseButton.addEventListener('click', hideModal)
}

var modalCancelButton = document.querySelector('#create-post-modal .modal-cancel-button')
if (modalCancelButton) {
	modalCancelButton.addEventListener('click', hideModal)
}

var postsContent = document.querySelector('.posts-content')
if (postsContent) {
	postsContent.addEventListener('click', handlePostClick)
}

window.addEventListener('DOMContentLoaded', function () {
	addActive()
	toggleBuildGenButtons()
})

var checkBoxButtons = document.getElementsByClassName('theme');
var typeCheckBoxButtons = document.getElementsByClassName('themeTypeSelection')
function typeCheckBoxes()
{
	for(var i = 0; i < typeCheckBoxButtons.length; i++)
	{
		if(typeCheckBoxButtons[i].id != this.id)
			typeCheckBoxButtons[i].checked = false
	}
	for(var i = 0; i < checkBoxButtons.length; i++)
	{
		if(checkBoxButtons[i].checked == true)
		{
			if(!(checkBoxButtons[i].id.endsWith(this.id)))
			{
				checkBoxButtons[i].checked = false
				if(this.id == "Room")
					checkBoxButtons[i - checkBoxButtons.length / 2].checked = true
				else
					checkBoxButtons[i + checkBoxButtons.length / 2].checked = true
			}
		}
	}
}
for(var i = 0; i < typeCheckBoxButtons.length; i++)
{
	typeCheckBoxButtons[i].addEventListener('click',typeCheckBoxes)

}



function themeCheckBoxes()
{
	var checkedType;
	
	//console.log(this.id);
	for(var i = 0; i < typeCheckBoxButtons.length; i++)
	{	

		if(this.id.endsWith(typeCheckBoxButtons[i].id))
		{
			typeCheckBoxButtons[i].checked = true
			checkedType = i
		}
		else
		{
			typeCheckBoxButtons[i].checked = false
		}
	}

	for(var i = 0; i < checkBoxButtons.length; i++)
	{

		if(!checkBoxButtons[i].id.endsWith(typeCheckBoxButtons[checkedType].id))
			checkBoxButtons[i].checked = false
	}
}

for(var i = 0; i < checkBoxButtons.length; i++)
{
	checkBoxButtons[i].addEventListener('click',themeCheckBoxes)
}


function sendGenerateRequest() {
	var descriptionBox = document.getElementById('description-box')
	var themeType = "None"

	for(var i = 0; i < typeCheckBoxButtons.length; i++) {
		if(typeCheckBoxButtons[i].checked)
			themeType = typeCheckBoxButtons[i].id
	}

	var themes = []
	for(var i = 0; i < checkBoxButtons.length; i++) {
		if(checkBoxButtons[i].checked)
			themes.push(checkBoxButtons[i].id)
	}
	
	postContent = {
		themeType: themeType,
		theme: themes
	}

	if(themeType == "None" || (themes === undefined || themes.length < 1)) {
		alert("You have not chosen a theme")
	} else {
		var req = new XMLHttpRequest()
		var reqUrl = "/buildgen/newGen"
		console.log("== reqUrl:", reqUrl)

		req.open('POST', reqUrl)
			var reqBody = JSON.stringify(postContent)
			req.responseType = 'text'
			req.setRequestHeader('Content-Type', 'application/json')

		req.onload = function() {
			console.log("Response: ", req.response)
			descriptionBox.textContent = req.response
		}

		req.send(reqBody)
	}
	//location.reload();
}

var genButton = document.getElementById('navbar-gen-button');
if (genButton) {
	genButton.addEventListener("click", sendGenerateRequest)
}

function createPost()
{
	//postName
	var postName = document.getElementById('post-text-input').value
	//postType
	var postType = document.getElementsByClassName('typeText')[0].textContent

	//postAuthor
	var postAuthor = document.getElementById('post-attribution-input').value
	//postDate
	var date = new Date()
	var postDate = "" + (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear()
	//postData
	var postDescription = document.getElementsByClassName('discription-text')
	var postData = ""
	for(var i = 0; i < postDescription.length; i++)
	{
		postData += " " + (postDescription[i].textContent)
	}
	
	var postContent = 
	{
		postName: postName,
		postType: postType,
		postAuthor: postAuthor,
		postDate: postDate,
		postData: postData
	}

	if(postData == "" || postData == " " )
	{
		alert("You have not generated a description")
	}
	else if (postAuthor != "" && postName != "")
	{
	var req = new XMLHttpRequest()
	var reqUrl = "/post/newPost"
	console.log("== reqUrl:", reqUrl)
	req.open('POST', reqUrl)
	var reqBody = JSON.stringify(postContent)
	req.setRequestHeader('Content-Type', 'application/json')

	var newPostHTML = Handlebars.templates.post(postContent)
	var postContainer = document.getElementsByClassName("posts-content")[0]
	postContainer.insertAdjacentHTML('beforeend',newPostHTML)
	req.send(reqBody)

	hideModal()
	}
	else
	{
		alert("you have not filled out the name of your generation or your name")
	}
}
var createPostButton = document.getElementsByClassName("modal-accept-button")[0]
if (createPostButton) {
	createPostButton.addEventListener('click', createPost)
}