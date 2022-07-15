import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Employee,Skills } from 'src/app/services/employees/employee.state.model';
import { EmployeeService } from 'src/app/services/employees/employee.service';

//import { MustMatch } from '@app/_helpers';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    dob: new FormControl(''),
    phoneNumber: new FormControl(''),
    streetAddress: new FormControl(''),
    city: new FormControl(''),
    postalCode: new FormControl(''),
    country: new FormControl(''),
    skill: new FormControl(''),
    skills: new FormGroup({
      skill: new FormControl(''),
        yearsOfExperience: new FormControl(''),
        rating: new FormControl('')
    }),
    yearsOfExperience: new FormControl(''),
    rating: new FormControl(''),
  });

  id: string = '';
  isAddMode: boolean = true;
  loading = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private employeeService: EmployeeService,
     // private alertService: AlertService
  ) {
    
  }

  ngOnInit() {
      this.id = this.route.snapshot.params['id'];
      this.isAddMode = !this.id;
      this.setUpform();
      if (!this.isAddMode) {
          this.employeeService.getEmployee(this.id)
              .pipe(first())
              .subscribe(x => this.form.patchValue(x));
      }
  }

  setUpform(){
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required],
      skills: this.formBuilder.array([]),
      skill: ['', Validators.required],
      yearsOfExperience: ['', Validators.required],
      rating: ['', Validators.required]
  });
  }

  goBack(){
    this.router.navigate(['home'])
  }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }
    get skills() : FormArray {
      return this.form.get("skills") as FormArray
    }
   
    newSkill(): FormGroup {
      return this.formBuilder.group({
        skill: ['', Validators.required],
        yearsOfExperience: ['', Validators.required],
        rating: ['', Validators.required]
      })
    }
   
    addSkills() {
      this.skills.push(this.newSkill());
      console.log(this.form)
      console.log(this.skills)

    }
   
    removeSkill(i:number) {
      this.skills.removeAt(i);
    }
    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
      //  this.alertService.clear();

        // stop here if form is invalid
      //  if (this.form.invalid) {
      //      return;
     //   }

        this.loading = true;
        if (this.isAddMode) {
            this.createUser();
        } else {
            this.updateUser();
        }
    }

    private createUser() {
        let skills:Skills[] = [];
        this.skills.controls.forEach((i : any)=>{
          console.log(i)
          let x:Skills = {
           // skillName: '',//i.skill.value,
            //yearsOfExperince: 2,//i.yearsOfExperience.value,
           // seniorityRating: 1//i.yearsOfExperience.value
           skillName: i.controls['skill'].value,
           yearsOfExperince: i.controls['yearsOfExperience'].value,
           seniorityRating: i.controls['rating'].value
          }
          skills.push(x);
        });
        let newEmployee: Employee = {
          firstName: this.form.get('firstName')?.value,
          lastName: this.form.get('lastName')?.value,
          email: this.form.get('email')?.value,
          phone: this.form.get('phoneNumber')?.value,
          dob: this.form.get('dob')?.value,
          skills: skills,
          address: {
            street: this.form.get('streetAddress')?.value,
            city:this.form.get('city')?.value,
            postalCode: this.form.get('postalCode')?.value,
            country: this.form.get('country')?.value,
          }
        }
        console.log(newEmployee)
        this.employeeService.createEmployee(newEmployee)
            .pipe(first())
            .subscribe({
                next: () => {
                //    this.alertService.success('Employee added', { keepAfterRouteChange: true });
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                //    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    private updateUser() {
        this.employeeService.upgateEmployee(this.id, this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                  //  this.alertService.success('Employee updated', { keepAfterRouteChange: true });
                    this.router.navigate(['../../'], { relativeTo: this.route });
                },
                error: error => {
              //      this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
}