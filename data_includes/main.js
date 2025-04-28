PennController.ResetPrefix(null); // Initiates PennController
SetCounter( "inc" , 1 )
PennController.DebugOff()
// Start typing your code here
 // Initiates PennController

// Start typing your code here

Sequence( "consent","welcome", "practice_intro", "practice","experiment_intro", randomize("experiment") ,"exit","send", "final" )
//for testing
//Sequence( "consent","intro","welcome", "practice_intro", "practice 1", "practice 2", "send" ,"exit", "final" )

newTrial("consent",
    newHtml("consent_form", "consent.html")
        .cssContainer({"width":"720px"})
        .checkboxWarning("You must consent before continuing.")
        .print()
    ,
    newButton("continue", "Click to continue")
        .center()
        .print()
        .wait(getHtml("consent_form").test.complete()
                  
.failure(getHtml("consent_form").warn())
        )
)

// newTrial("intro",
//     newHtml("intro", "intro.html")
//         .print()
//         .log()
//     ,
//     newButton("continue", "Click to continue")
//         .center()
//         .print()
//         .wait(getHtml("intro").test.complete()
// .failure(getHtml("intro").warn())
//         )
//         ,
//   getHtml("intro").log()
// )

newTrial("welcome",
    newHtml("welcome", "welcome.html")  // Load the external HTML file
        .print()  // Print the content of the HTML file
    ,
    newButton("Start")
        .print()
        .wait()  // Wait for the participant to click the "Start" button
);

newTrial( "practice_intro" ,
    defaultText
        .print()
    ,
    newText("<p>Let's practice some sentences now. </p>")
    ,
    newButton("Continue")
        .print()
        .wait()
    )

Template( "practice.csv",variable =>

    newTrial( "practice",
    defaultText
        .print()
    ,
    newText("stimulus","<b>"+variable.stimulus+"</b><br>")
    ,
    newText("explanation","<br><i>Trial explained: "+variable.explanation+"</i> <br><br>")
    ,
    newTextInput("continuation")
        .log()
        .lines(0)
        .size(Math.max(500), 60) // Adjust size based on text length
        .print()
    ,
    
newButton("Continue")
    .print()
    .wait(
        // First, check if the text input matches the expected correction
        // getText("error-text")?.remove(),
        // getText("error-scale")?.remove(),
        getTextInput("continuation")
            .test.text(variable.expected)
            .failure(
                newText("error-text", "The continuation does not seem to be right. Please read the explanation above and try again.")
                    .color("red")
                    .print()
            )
        
    )

 )
.log('item',variable.item)
.log('stimulus',variable.stimulus)
.log('sentence',variable.sentence)
.log('expected',variable.expected)
)

newTrial( "experiment_intro" ,
    defaultText
        .print()
    ,
    newText("<p>This is the end of the practice session. Now let us work on some real speech transcriptions. </p>")
    ,
    newButton("Continue")
        .print()
        .wait()
    )

Template( "fulldesign.csv",variable =>
    newTrial( "experiment",
    defaultText
        .print()
    ,

    newText("stimulus","<b>"+variable.stimulus+"</b><br><br>")
    ,
    newTextInput("continuation")
        .log()
        .lines(0)
        .size(Math.max(500), 60) // Adjust size based on text length
        .print()
    ,
    newButton("Continue")
        .print()
        .wait(
            getTextInput("continuation").testNot.text("")
                .failure( newText("warning", "Please enter a response before continuing.").color("red").print() )
        )
    )
.log('item',variable.item)
.log('sentver',variable.sentver)
.log('stimulus',variable.stimulus)
.log('sentence',variable.sentence)
.log('expected',variable.expected)
)

newTrial("exit",
    newHtml("exit", "exit.html")
        .print()
        .log()
    ,
    newButton("continue", "Click to continue")
        .center()
        .print()
        .wait(getHtml("exit").test.complete()
                  
.failure(getHtml("exit").warn())
        )
    ,
   getHtml("exit").log("prolific_id")
)

SendResults( "send" )

newTrial( "final" ,
    newText("<p>Thank you for your participation! Your results have been successfully sent to the server. </p>")
        .print(),
    newButton("void")
        .wait()
    
)

//design some good pratice trials with excellent explanation

