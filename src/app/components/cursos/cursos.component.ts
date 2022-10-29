import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CursoModel } from './cursos.model';
import { ApiService } from '../../shared/api.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
  formValue!: FormGroup;
  cursoModelObj: CursoModel = new CursoModel();
  cursoData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  constructor(private formbuilder: FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      nombre:[''],
      horario:[''],
      seccion:[''],
      carrera:['']
    })
    this.getAllCursos()
  }

  clickAddCurso(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postCursoDetails(){
    this.cursoModelObj.nombre = this.formValue.value.nombre;
    this.cursoModelObj.horario = this.formValue.value.horario;
    this.cursoModelObj.seccion = this.formValue.value.seccion;
    this.cursoModelObj.carrera = this.formValue.value.carrera;

    this.api.postCurso(this.cursoModelObj).subscribe(res=>{
      console.log(res);
      alert("Curso Agregado Exitosamente")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllCursos();
    },
    err=>{
      alert("Algo salió mal")
    })
  }

  getAllCursos(){
    this.api.getCursos().subscribe(res=>{
      this.cursoData = res;
    })
  }

  deleteCursos(cur:any){
    this.api.deleteCurso(cur.id).subscribe(res=>{
      alert("Curso Eliminado")
      this.getAllCursos()
    })
  }

  onEdit(cur:any){
    this.showAdd = false;
    this.showUpdate = true;
    this.cursoModelObj.id = cur.id;
    this.formValue.controls['nombre'].setValue(cur.nombre);
    this.formValue.controls['horario'].setValue(cur.horario);
    this.formValue.controls['seccion'].setValue(cur.seccion);
    this.formValue.controls['carrera'].setValue(cur.carrera);
  }

  updateCursoDetails(){
    this.cursoModelObj.nombre = this.formValue.value.nombre;
    this.cursoModelObj.horario = this.formValue.value.horario;
    this.cursoModelObj.seccion = this.formValue.value.seccion;
    this.cursoModelObj.carrera = this.formValue.value.carrera;

    this.api.updateCurso(this.cursoModelObj, this.cursoModelObj.id).subscribe(res=>{
      alert("Curso Actualizado");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllCursos();
    })
  }

}
