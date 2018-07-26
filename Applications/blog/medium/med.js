
$(document).ready(function () {
    $.ajax({
        url: 'https://cors-anywhere.herokuapp.com/https://api.rss2json.com/v1/api.json',
        type: 'GET',
        dataType: 'json',
        data:{
            rss_url: 'https://medium.com/feed/@kk_ncnt',
            api_key: 'q7nxkxbvnnywdsyqh9vfsbpfo9zk2ziurkea5z6p',
            count: 15
        },
        error: function(error) { alert('Failed!');}
    }).done(function(rss) {
        let posts = rss.items;
        updateAllArticles(posts);
    });
})

function updateLatestArticle(posts){
    $( '#latestheader' ).text(posts[0].title);
    $( '#latestimage').attr('style', 'background-image:url('+posts[0].thumbnail + ');');
    $( '#latestheader' ).attr('href', posts[0].link);
    $( '#latestdate' ).text(posts[0].pubDate.substring(0, 10));
}
function updateAllArticles(posts){
    updateLatestArticle(posts);
    for(var i = 1; i < 10; i++){
        updateSingleArticle('#article'+i+'header', '#article'+i+'date', '#article'+i+'pic', '#article'+i+'tags','#article'+i+'cont', i, posts);
    }
}
function updateSingleArticle(header, date, pic, tags, content, num, posts){
        $( header).text(posts[num].title);
        $( header).attr('href', posts[num].link);
        $( date).attr('href', posts[num].link);
        $( date).text(posts[num].pubDate.substring(0, 10));
        $( pic).attr('src', posts[num].thumbnail);
        $( makeTags(posts[num].categories) ).insertAfter(tags);
        $( getExcerpt(posts, num)).insertAfter(content);
}

function getExcerpt(posts, num){
    var fullContent = posts[num].content;
    var str = fullContent.substring(fullContent.indexOf('</figure>')+9);
    var el = $('<div></div>');
    var excerpt = el.html(str);
    var plainText = '<p>'+ excerpt.text().substr(0, 300)+'</p>';
    return plainText;
}

function makeTags(tags){
    var tagArray = tags.toString().split(',');
    let htmlToInsert= '';
    for(var i =0; i < tagArray.length; i++){
        htmlToInsert+= '<a href=\"';
        htmlToInsert+= 'https://medium.com/tag/' + tagArray[i];
        htmlToInsert+='\">' + tagArray[i].charAt(0).toUpperCase() + tagArray[i].substring(1)+ '</a>'
    }
    return htmlToInsert;
}
