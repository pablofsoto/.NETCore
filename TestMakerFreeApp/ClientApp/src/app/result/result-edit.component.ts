import { Component, Inject, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: "result-edit",
  templateUrl: './result-edit.component.html',
  styleUrls: ['./result-edit.component.less']
})

export class ResultEditComponent {
  title: string;
  result: Result;
  // this will be TRUE when editing an existing result,
  // FALSE when creating a new one.
  editMode: boolean;
  form: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,private fb: FormBuilder,
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {
    // create an empty object from the Quiz interface
    this.result = <Result>{};
    
    this.createForm();
    var id = +this.activatedRoute.snapshot.params["id"];
    // check if we're in edit mode or not
    this.editMode = (this.activatedRoute.snapshot.url[1].path ==="edit");
    if (this.editMode) {
      // fetch the quiz from the server
      var url = this.baseUrl + "api/result/" + id;
      this.http.get<Result>(url).subscribe(res => {
        this.result = res;
        this.title = "Edit - " + this.result.Text;
        this.updateForm();
      }, error => console.error(error));
    }
    else {
      this.result.QuizId = id;
      this.title = "Create a new Result";
    }
  }

  onSubmit(result: Result) {
    // build a temporary quiz object from form values
    var tempResult = <Result>{};
    tempResult.Text = this.form.value.Text;
    tempResult.MaxValue = this.form.value.MaxValue;
    tempResult.MinValue = this.form.value.MinValue;
    tempResult.QuizId = this.result.QuizId;

    var url = this.baseUrl + "api/result";
    if (this.editMode) {
      tempResult.Id = this.result.Id;
      this.http
        .post<Result>(url, tempResult)
        .subscribe(res => {
          var v = res;
          console.log("Result " + v.Id + " has been updated.");
          this.router.navigate(["quiz/edit", v.QuizId]);
            }, error => console.log(error));
        }
    else {
      this.http
        .put<Result>(url, tempResult)
        .subscribe(res => {
          var v = res;
          console.log("Result " + v.Id + " has been created.");
      this.router.navigate(["quiz/edit", v.QuizId]);
              }, error => console.log(error));
          }
  }
  onBack() {
    this.router.navigate(["quiz/edit", this.result.QuizId]);
  }
  createForm() {
    this.form = this.fb.group({
    Text: ['', Validators.required],
    MinValue: ['', Validators.pattern(/^\d*$/)],
    MaxValue: ['', Validators.pattern(/^\d*$/)]
    });
  }
  updateForm() {
    this.form.setValue({
    Text: this.result.Text||'',
    MinValue: this.result.MinValue || '',
    MaxValue: this.result.MaxValue || ''
    });
  }
  // retrieve a FormControl
  getFormControl(name: string) {
    return this.form.get(name);
  }
  // returns TRUE if the FormControl is valid
  isValid(name: string) {
    var e = this.getFormControl(name);
    return e && e.valid;
  }
  // returns TRUE if the FormControl has been changed
  isChanged(name: string) {
    var e = this.getFormControl(name);
    return e && (e.dirty || e.touched);
  }
  // returns TRUE if the FormControl is invalid after user changes
  hasError(name: string) {
    var e = this.getFormControl(name);
    return e && (e.dirty || e.touched) && !e.valid;
  }
}
