Wordpress App Backend
======================

This is a simple Javascript API that allows you to us a wordpress site as the back end of a web app. I've given an example of using it in a JQuery Mobile site. It use the programatic API to wordpress that is provided by installing the [JSON API Plugin](http://wordpress.org/plugins/json-api/) for wordpress (install this plugin is essential).

I'm using it in a class I teach and am giving a lecture on it in a couple of weeks and promise to get some more proper documentation up by then. In the mean time, here is an example of using it:

		 <script src="js/wordpressInterface.js"></script>

         <script>
              jQuery(document).ready(function() {
                     // create a Wordpress API object
                     var wordPressAPI = WordpressAPI()

                     // here we specify a lot of parameters
                     // mostly the ids of html elements that are used to access the data

                     // the URL of your wordpress site
                     wordPressAPI.setURL("http://localhost:8888/wordpress/");

                     // elements where you want to display the title and contents of the 
                     // current post
                     wordPressAPI.setPostTitleElement("#post_title");
                     wordPressAPI.setPostContentElement("#post_contents");
                     
                     // alternative, provide an look up table which provides the 
                     // ids for all of the properties of the post that you want to display
                     wordPressAPI.setPostElements({
                            title : "#post_title",
                            content : "#post_contents",
                            status : "#post_status"
                     });

                     // previous and next buttons for navigating posts
                     wordPressAPI.setNextButton("#next");
                     wordPressAPI.setPreviousButton("#previous");

                     // form elements for a post creation form
                     wordPressAPI.setCreatePostButton("#create_post");
                     wordPressAPI.setPostTitleInput("#post_title_input");
                     wordPressAPI.setPostContentInput("#post_contents_input");

                     // user name and password needed for creating a form
                     wordPressAPI.setUserName("admin");
                     wordPressAPI.setUserPassword("idiotbriefcase");

                     // a list element for displaying a list of posts
                     wordPressAPI.setPostsListUL("#activitylist");
                     // a url that each of the items in your post list should link to. 
                     wordPressAPI.setPostListLinkTarget("#post");
                     // style elements for styling your list items
                     wordPressAPI.setPostListItemStyle('"data-transition="slide" data-theme="c"');
                     
                     // optional: restrict the posts list to a particular tag
                     wordPressAPI.setPostsListTag("activity");
                     // optional: add a tag to new posts, add multiple tags using a comma separated list
                     wordPressAPI.setCreatePostTag("activity");

                     // intialise the API, setting up all the buttons
                     wordPressAPI.init();

                     // read in a particular post as your current displayed post
                     wordPressAPI.readSinglePost("1");
                     
                     // alternative, read a post supplying a lookup of elements in which to display the content, title and date etc. (all optional)
                     /*
                     post_elements = {
                            title : "#post_title",
                            content : "#post_contents",
                            date : "#post_date"
                     }
                     wordPressAPI.readSinglePost("1", post_elements);
                     */
              });
         </script>

