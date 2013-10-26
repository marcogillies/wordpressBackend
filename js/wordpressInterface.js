function WordpressAPI (){
       var apiobj = {
              post_content_element : null,
              setPostContentElement : function (cd){
                     //console.log("setting content div " + cd);
                     this.post_content_element = cd;
              },

              post_title_element : null,
              setPostTitleElement : function (cd){
                     //console.log("setting content div " + cd);
                     this.post_title_element = cd;
              },

              /*
              post_date_element : null,
              setPostDateElement : function (cd){
                     //console.log("setting content div " + cd);
                     this.post_date_element = cd;
              },
              */
              post_elements : null,
              setPostElements : function(pe){
                     this.post_elements = pe;
              },

              next_btn : null,
              setNextButton : function (nb){
                     this.next_btn = nb;
              },

              previous_btn : null,
              setPreviousButton : function (pb){
                     this.previous_btn = pb;
              },

              create_post_btn : null,
              setCreatePostButton : function (cpb){
                     this.create_post_btn = cpb;
              },

              user_name : null,
              setUserName : function (un){
                     this.user_name = un;
              },

              user_password : null,
              setUserPassword : function (pw){
                     this.user_password = pw;
              },


              post_title_input : null,
              setPostTitleInput : function (pti){
                     this.post_title_input = pti;
              },

              post_content_input : null,
              setPostContentInput : function (pci){
                     this.post_content_input = pci;
              },

              list_page : null,
              setListPage : function (lp){
                     this.list_page = lp;
              },

              post_list_link_target : null,
              setPostListLinkTarget : function (pp){
                     this.post_list_link_target = pp;
              },

              post_list_item_style : '',
              setPostListItemStyle : function (st){
                     this.post_list_item_style = st;
              },

              posts_list_ul : null,
              setPostsListUL : function (plul){
                     this.posts_list_ul = plul;
              },

              posts_list_tag : null,
              setPostsListTag : function (tag){
                     this.posts_list_tag = tag;
              },

              create_post_tag : null,
              setCreatePostTag : function (tag){
                     this.create_post_tag = tag;
              },

              nextID : null,
              prevID : null,
              // remember to change the urls in this example

              wp_url : null,
              api_read_url : null,
              init_url : null,
              //api_read_url : "http://localhost:8888/wordpress/?json=get_post&dev=1&id=",
              //init_url : "http://localhost:8888/wordpress/?json=get_post&dev=1&id=1",
              setURL : function(url){
                     this.wp_url = url+"/";
                     this.api_read_url = this.wp_url+"?json=get_post&dev=1&id=";
                     this.init_url = this.api_read_url+"1";       
              },

              getID : function (url) {
                            console.log(url);
                            var str = new String(url)
                            var x = str.split("=");
                            var id = x[1];
                            return id;
                     },


              readSinglePost : function  (id, post_elements) {
                            var URL = this.api_read_url + id;
                            console.log(URL);
                            if(post_elements == undefined){
                                   if(this.post_elements != null){
                                          post_elements = this.post_elements;
                                   }else {
                                          post_elements = {};
                                          if(this.post_content_element){
                                                 post_elements.content = this.post_content_element;
                                          }
                                          if(this.post_title_element){
                                                 post_elements.title = this.post_title_element;
                                          }
                                   }
                            }
                            //console.log("content div " + this.content_div);
                            var self = this;
                            jQuery.ajax({
                                   url: URL,
                                   dataType: 'json',
                                   success: function(data) {
                                          console.log(data);
                                          try {
                                                 for(var attribute in post_elements){
                                                        if(post_elements.hasOwnProperty(attribute)
                                                               && data.post.hasOwnProperty(attribute))
                                                        {
                                                             jQuery(post_elements[attribute]).html(data.post[attribute]);

                                                        }
                                                 }
                                                 /*
                                                 if(post_title_element!= null){
                                                        jQuery(post_title_element).html(data.post.title);
                                                 }
                                                 if(post_content_element!= null){
                                                        jQuery(post_content_element).html(data.post.content);
                                                 }
                                                 if(post_date_element!= null){
                                                        jQuery(post_date_element).html(data.post.date);
                                                 }
                                                 */
                                          }
                                          catch (e) {
                                                 console.log(e);
                                                 return; // you should include some of your own error-handling code or messages here.
                                          }
                                          try {

                                                 //console.log(self.nextID);
                                                 self.nextID = self.getID(data.next_url);
                                          }
                                          catch (e) {
                                                 console.log(e);
                                                 ; // you should include some of your own error-handling code or messages here.
                                          }
                                          try {
                                                 self.prevID = self.getID(data.previous_url);
                                          }
                                          catch (e) {
                                                 console.log(e);
                                                 ; // you should include some of your own error-handling code or messages here.
                                          }

                            } });
                     },

              getNext : function () {
                            var self = this;
                            jQuery(this.next_btn).click(function() {
                               console.log(self.nextID);
                               var id = self.nextID;
                               var nextURL = self.api_read_url + id;
                               self.readSinglePost(id);
                            });
                     },

              getPrevious : function () {
                            var self = this;
                            jQuery(this.previous_btn).click(function() {
                                   var id = self.prevID;
                                   var prevURL = self.api_read_url + id;
                                   self.readSinglePost(id);
                            });
                     },

              createButton : function () {
                            jQuery("#create").click(function(){
                                   jQuery("#form").toggle();
                            });
                     },

              addContent : function (data) {
                            var username = "&author="+this.user_name; 
                            var pwd = "&user_password="+this.user_password;
                            var title = "&title="+jQuery(this.post_title_input).val();
                            var content = "&content="+jQuery(this.post_content_input).val();
                            var tags = "";
                            if (this.create_post_tag != null){
                                   tags = "&tags="+this.create_post_tag;
                            }
                            var post = this.wp_url+"?json=posts/create_post&dev=1&status=publish"+pwd+username+title+content+tags+"&nonce="+data.nonce;
                            //var post = "http://localhost:8888/wordpress/?json=posts/create_post&dev=1&status=publish"+pwd+username+title+content+"&nonce="+data.nonce;
                            console.log(post);
                            var self=this;
                            jQuery.ajax({
                                   url: post,
                                   type: "POST",
                                   dataType: 'json',
                                   success: function(data) {
                                          self.populateList();   
                                          jQuery.mobile.navigate("#list");
                                   }
                            });
                     },

              getNonce : function (){
                            console.log("get nonce");
                            var get_nonce_url = this.wp_url+"?json=get_nonce&dev=1&controller=posts&method=create_post";
                            //var get_nonce_url = "http://localhost:8888/wordpress/?json=get_nonce&dev=1&controller=posts&method=create_post";
                            var self = this;
                            jQuery.ajax({
                                   url: get_nonce_url,
                                   type: "GET",
                                   dataType: 'json',
                                   success: function (data){self.addContent(data);}
                            });
                     },

              submitClick : function () {
                            var self = this;
                            jQuery(this.create_post_btn).click(function(){
                                   self.getNonce();
                            })
                     },

              addListItem : function (itemId, title){
                            var linktarget = this.post_list_link_target;
                            if(linktarget == null){
                                   linktarget = "#";
                            } 
                            jQuery(this.posts_list_ul).append('<li id="'+itemId+'"><a href="'+linktarget+" "+this.post_list_item_style+'>'+title+'</a></li>').listview('refresh');
                            var self = this;
                            jQuery("#"+itemId).click(function (){
                                   var postId = itemId.split("_")[1];
                                   console.log(postId);
                                   self.readSinglePost(postId);
                            });
                            console.log("added title " + title)
                     },

              populateList : function (){
                            var self = this;
                            var url = this.wp_url+"?json=get_posts&dev=1";
                            if (this.posts_list_tag != null){
                                   url = this.wp_url+"?json=get_tag_posts&dev=1&tag_slug="+this.posts_list_tag;
                            }
                            console.log(url);
                            jQuery(this.posts_list_ul).empty();
                            jQuery.ajax({
                                   url: url,
                                   type: "POST",
                                   dataType: 'json',
                                   success: function(data) {
                                          for(var i = 0; i < data.posts.length; i++){
                                                 //console.log();
                                                 self.addListItem("post_"+data.posts[i].id, data.posts[i].title);
                                          }   
                                   }
                            });
                     },

              init : function(){
                            this.getNext();
                            this.getPrevious();
                            this.submitClick();
                            this.populateList();
                     }
       };
       return apiobj;
};