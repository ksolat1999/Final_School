import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MaestroModel } from './maestros.model';
import { ApiService } from '../../shared/api.service';

@Component({
  selector: 'app-maestros',
  templateUrl: './maestros.component.html',
  styleUrls: ['./maestros.component.css']
})
export class MaestrosComponent implements OnInit {
  formValue!: FormGroup;
  maestroModelObj: MaestroModel = new MaestroModel();
  maestroData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  constructor(private formbuilder: FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      nombre:[''],
      correo:[''],
      carrera:['']
    })
    this.getAllMaestros()
  }

  clickAddMaestro(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postMaestroDetails(){
    this.maestroModelObj.nombre = this.formValue.value.nombre;
    this.maestroModelObj.correo = this.formValue.value.correo;
    this.maestroModelObj.carrera = this.formValue.value.carrera;

    this.api.postMaestro(this.maestroModelObj).subscribe(res=>{
      console.log(res);
      alert("Maestro Agregado Exitosamente")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllMaestros();
    },
    err=>{
      alert("Algo salió mal")
    })
  }

  getAllMaestros(){
    this.api.getMaestros().subscribe(res=>{
      this.maestroData = res;
    })
  }

  deleteMaestros(mae:any){
    this.api.deleteMaestro(mae.id).subscribe(res=>{
      alert("Maestro Eliminado")
      this.getAllMaestros()
    })
  }

  onEdit(mae:any){
    this.showAdd = false;
    this.showUpdate = true;
    this.maestroModelObj.id = mae.id;
    this.formValue.controls['nombre'].setValue(mae.nombre);
    this.formValue.controls['correo'].setValue(mae.correo);
    this.formValue.controls['carrera'].setValue(mae.carrera);
  }

  updateMaestroDetails(){
    this.maestroModelObj.nombre = this.formValue.value.nombre;
    this.maestroModelObj.correo = this.formValue.value.correo;
    this.maestroModelObj.carrera = this.formValue.value.carrera;

    this.api.updateMaestro(this.maestroModelObj, this.maestroModelObj.id).subscribe(res=>{
      alert("Maestro Actualizado");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllMaestros();
    })
  }

}
