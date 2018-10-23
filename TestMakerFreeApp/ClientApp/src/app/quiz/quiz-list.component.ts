import { Component, Inject, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "quiz-list",
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.less']
})


export class QuizListComponent implements OnInit {
  @Input() class: string;
  title: string;
  selectedQuiz: Quiz;
  quizzes: Quiz[];


  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router) {
    this.http = http;
    this.baseUrl = baseUrl;       
  }

  ngOnInit()
  {
      console.log("QuizListComponent " + " instantiated with the following class: " + this.class);

      var url = this.baseUrl + "api/quiz/";

      switch (this.class) {
        case "latest":
        default:
          this.title = "Latest Quizzes";
          url += "Latest/10";
          break;
        case "byTitle":
          this.title = "Quizzes by Title";
          url += "ByTitle/10";
          break;
        case "random":
          this.title = "Random Quizzes";
          url += "Random/10";
          break;
      }
          
     this.http.get<Quiz[]>(url)
        .subscribe(result => {
          //console.log(result);
          this.quizzes = result;
        },
      error => console.error(error));
  }
  onSelect(quiz: Quiz) {
    this.selectedQuiz = quiz;
    console.log("quiz with Id " + this.selectedQuiz.Id + " has been selected.");
    this.router.navigate(["quiz", this.selectedQuiz.Id]);
  }
}
