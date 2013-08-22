/**
 * @author Katie Akagi
 */

function recBooks(ds){
	
	var bookstodisplay = [];
	function displayBooks(bookArray){
		// takes the fully filtered array and fills bookRecs div with specified info	
		bookstodisplay.splice(0, bookstodisplay.length);
				
		for(i=0;i<bookArray.length;i++){
			var aBook = bookArray[i];
			var rawImageURL= aBook['Image'];
			var epiURL = aBook['Episode URL']
			var title = aBook['Title']
			var subtitle = aBook['Subtitle']
			var author = aBook['Author']
			var show = aBook['On show']
			var epiTitle = aBook['Episode title']
			
			if(subtitle == null){		
			bookstodisplay.push(
				'<div class="bookRec"><div class="ghostBooks"></div><div class="imageHolder"><image src='+rawImageURL.replace("raw","100/100/80")+'></div><div class="recText"><div class="rtLinkHolderNoSub"><a href="'+epiURL+'"><div class="showNoSub">'+show+':</div><div class="epiTitleNoSub">'+epiTitle+'</div></a></div><div class="rtTitleNoSub">'+title+'</div><div class="rtAuthor"><div class="by">by&nbsp;&nbsp;</div>'+author+'</div></div><div class="body shelf"></div>'
			)}else{
				bookstodisplay.push(
				'<div class="bookRec"><div class="ghostBooks"></div><div class="imageHolder"><image src='+rawImageURL.replace("raw","100/100/80")+'></div><div class="recText"><div class="rtLinkHolderHasSub"><a href="'+epiURL+'"><div class="showHasSub">'+show+':</div><div class="epiTitleHasSub">'+epiTitle+'</div></a></div><div class="rtTitleHasSub">'+title+':</div><div class="rtSubtitle">'+subtitle+'</div><div class="rtAuthor"><div class="by">by&nbsp;&nbsp;</div>'+author+'</div></div><div class="body shelf"></div>'
			)
			}		
		};//end bookstodisplay for loop
						
		if(bookstodisplay.length == 0){
			$('#bookRecs').html('<div class="body shelfSpace"><div class="ghostBooks"></div><div class="imageSize"></div><div class="recText"><div class="noBooks">Sorry.&nbsp;&nbsp;Looks like you&apos;re on your own for that adventure...</br><div/><div class="noBooksSub">(No results for that selection). Try again?</div></div></div><div class="body shelf"></div><div class="body shelfSpace"></div><div class="body shelf"></div>')
		}else{
			$('#bookRecs').html(bookstodisplay.join('</br>'));
			};
						
	}//end displayBooks		
	
	var ficNonBooks = [];	
	function createRecArray(string,data){
		// filters data set in two steps 1) when fiction or non-fiction is selected, corresponding ficNonBooks array is created; then when an adjective button is clicked, the ficNonBooks array is filtered and a smaller adjBooks array is created.
		ds.each(function(currentArray){
			var aBook = currentArray
			var title = aBook['Book'];
	
			if(aBook[string]=="y"){
				ficNonBooks.push(aBook);
			};
		});//end each loop function
		
		
		adjBooks = [];
		function createSmallArray(string,data){
			// specifies the second filter process.(creates array of books with selected adjective property).	
			var numBooks = data.length;
			
			for(i=0;i<numBooks;i++){
				var aBook = data[i];
				if(aBook[string]=="y"){
				adjBooks.push(aBook);
				};
			};//end smallArray forLoop
			
			displayBooks(adjBooks);
			
		};//end createSmallArray function
		
		
		$(".adj").on(
			"click",function(){
				
				$(".adj").removeClass("active");
				$(".adj").addClass("inactive");
				$(this).removeClass("inactive");
				$(this).addClass("active");
				
				var adjSelected = $(this).text();
				
				adjBooks.splice(0, adjBooks.length);
				
				createSmallArray(adjSelected,ficNonBooks);
				
			}
		)// end adj button on-click statement
		
	}; //end createRecArray
		
	
	$(".fic").on(
		"click",function(){
			
			ficNonBooks.splice(0, ficNonBooks.length);
			$('#bookRecs').html('<div class="body shelfSpace"></div><div class="body shelf"></div><div class="body shelfSpace"></div><div class="body shelf"></div>')
			
			$(".btn").removeClass("active");
			$(".btn").addClass("inactive");
			$(this).removeClass("inactive");
			$(this).addClass("active");
			
			$("#chooseAdventure").css('background-image','url("http://www.wnyc.org/i/raw/1/bookshelfBG.jpg")');
			$(".reveal").removeClass("reveal");
			
			var ficSelected = $(this).text();
			
			createRecArray(ficSelected, ds);			
			
			
		}	
	)// end fic button on-click statement 
	
	
};//end recBooks

function getData(doc){
	var ds = new Miso.Dataset({
    url: "data.csv",
    delimiter : ","

  });
  
  ds.fetch({
    success: function(){
        recBooks(ds);
    }

  });
                    
};//end getData

$(document).ready(getData);
