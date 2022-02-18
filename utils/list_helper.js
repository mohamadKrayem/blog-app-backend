const dummy = blogs => {
	return 1;
}

const totalLikes = blogs => {
	let likes = blogs.map(element => element.likes)
	return blogs.length==1
		? blogs[0].likes
		: likes.reduce((first, second) => first + second, 0);
}

function favoriteBlog(blogs){
	let likes = blogs.map(element => element.likes)

	let maximum = Math.max(...likes)

	let index = likes.findIndex(element => element==maximum);
	return {
		title: blogs[index].title,
		author: blogs[index].author,
		likes: blogs[index].likes
	};
}

function mostBlogs(blogs){
	let authors = blogs.map(element => element.author)
	authors.sort();
	let counter = 0;
	let maxNum = counter;
	let repeatedName = authors[0];
	let array = [authors[0]];

	for(let i=1; i<authors.length; i++){
		if(authors[i]!=authors[i-1]) array.push(authors[i]);
	}
	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < authors.length; j++) {
			if (authors[j] == array[i]) {
				counter++;
				if (counter > maxNum) {
					maxNum = counter;
					repeatedName = array[i];
				}
			}
		}
		counter = 0;
	}
	return {
		author: repeatedName,
		blogs: maxNum
	}
}

function mostLikes(blogs){
	let authors = blogs.map(element => element.author);
	authors.sort();
	let array = [authors[0]];
	let counter={author:'', likes:0};
	let maxlikes = counter;
	for(let i=1; i<authors.length; i++){
		if(authors[i]!=authors[i-1]) array.push(authors[i]);
	}
	for(let i=0; i<array.length; i++){
		for(let u=0; u<blogs.length; u++){
			if(blogs[u].author == array[i]){
				counter.author = array[i]
				counter.likes += blogs[u].likes;
			}
		}
		if(counter.likes>maxlikes.likes) maxlikes=counter;
		counter={author:'', likes:0}
	}
	return maxlikes;

}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}


