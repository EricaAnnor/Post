$(document).ready(()=>{
    $.get("/api/posts", results=>{
        getPosts(results, $(".postsContainer"))
    })

    function getPosts(results,container){
        container.html("")
        
        function createPostHtml(postData){
            var postedBy = postData.postedBy
            let fullName = postedBy.firstName + " " + postedBy.lastName
            let timestamps = timeDifference(new Date(), new Date(postData.createdAt))
    
            return `<div class="postContainer">
                <div class="upper"> 
                    <div class="postImageContainer">
                        <img src="${postedBy.profilePic}" >
                    </div>
                    <div class="postContentContainer">
                        <div class="postHeader>
                            <a href="/profile/${postedBy.userName}"> <span style="font-weight:bold; padding-right:5px">${fullName}</span> <span style="color:rgb(101,119,134);">@${postedBy.userName}  ${timestamps}</span></a>
                        </div>
                        <div class="postMain">
                            <span>${postData.content}</span>
                        </div>
                    </div>
                </div>
                    <div class="postFooter">
                        <div class="postButtonContainer">
                            <button>
                                <i class="far fa-comment"></i>
                            </button>
                           
                        </div>
                        <div class="postButtonContainer">
                            <button>
                                <i class="fas fa-retweet"></i>
                            </button>
                           
                        </div>
                        <div class="postButtonContainer">
                            <button>
                                <i class="far fa-heart"></i>
                            </button>
                           
                        </div>
                    </div>
                
            
            </div>`
        }

        results.forEach((result)=>{
            var html = createPostHtml(result)
            container.append(html)
        })

        if(results.length == 0){
            container.append("<span>no results found</span>")
        }
        

    }

    function timeDifference(current, previous) {

        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;
    
        var elapsed = current - previous;
    
        if (elapsed < msPerMinute) {
            if(elasped/1000 < 30){
                return "just now"
            }
            
            return Math.round(elapsed/1000) + ' seconds ago';   
        }
    
        else if (elapsed < msPerHour) {
            return Math.round(elapsed/msPerMinute) + ' minutes ago';   
        }
    
        else if (elapsed < msPerDay ) {
            return Math.round(elapsed/msPerHour ) + ' hours ago';   
        }
    
        else if (elapsed < msPerMonth) {
            return Math.round(elapsed/msPerDay) + ' days ago';   
        }
    
        else if (elapsed < msPerYear) {
            return Math.round(elapsed/msPerMonth) + ' months ago';   
        }
    
        else {
            return Math.round(elapsed/msPerYear ) + ' years ago';   
        }
    }
})