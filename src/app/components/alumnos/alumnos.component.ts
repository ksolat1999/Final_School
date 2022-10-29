import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlumnoModel } from './alumnos.model';
import { ApiService } from '../../shared/api.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {
  formValue!: FormGroup;
  alumnoModelObj: AlumnoModel = new AlumnoModel();
  alumnoData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  constructor(private formbuilder: FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      nombre:[''],
      edad:[''],
      correo:[''],
      carrera:[''],
      cursos:['']
    })
    this.getAllAlumnos()
  }
  
  clickAddAlumno(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postAlumnoDetails(){
    this.alumnoModelObj.nombre = this.formValue.value.nombre;
    this.alumnoModelObj.edad = this.formValue.value.edad;
    this.alumnoModelObj.correo = this.formValue.value.correo;
    this.alumnoModelObj.carrera = this.formValue.value.carrera;
    this.alumnoModelObj.cursos = this.formValue.value.cursos;

    this.api.postAlumno(this.alumnoModelObj).subscribe(res=>{
      console.log(res);
      alert("Alumno Agregado Exitosamente")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllAlumnos();
    },
    err=>{
      alert("Algo salió mal")
    })
  }

  getAllAlumnos(){
    this.api.getAlumnos().subscribe(res=>{
      this.alumnoData = res;
    })
  }

  deleteAlumnos(alu:any){
    this.api.deleteAlumno(alu.id).subscribe(res=>{
      alert("Alumno Eliminado")
      this.getAllAlumnos()
    })
  }

  onEdit(alu:any){
    this.showAdd = false;
    this.showUpdate = true;
    this.alumnoModelObj.id = alu.id;
    this.formValue.controls['nombre'].setValue(alu.nombre);
    this.formValue.controls['edad'].setValue(alu.edad);
    this.formValue.controls['correo'].setValue(alu.correo);
    this.formValue.controls['carrera'].setValue(alu.carrera);
    this.formValue.controls['cursos'].setValue(alu.cursos);
  }

  updateAlumnoDetails(){
    this.alumnoModelObj.nombre = this.formValue.value.nombre;
    this.alumnoModelObj.edad = this.formValue.value.edad;
    this.alumnoModelObj.correo = this.formValue.value.correo;
    this.alumnoModelObj.carrera = this.formValue.value.carrera;
    this.alumnoModelObj.cursos = this.formValue.value.cursos;

    this.api.updateAlumno(this.alumnoModelObj, this.alumnoModelObj.id).subscribe(res=>{
      alert("Alumno Actualizado");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllAlumnos();
    })
  }
}
