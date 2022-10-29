import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CarreraModel } from './carreras.model';
import { ApiService } from '../../shared/api.service';

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.css']
})
export class CarrerasComponent implements OnInit {
  formValue!: FormGroup;
  carreraModelObj: CarreraModel = new CarreraModel();
  carreraData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  constructor(private formbuilder: FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      nombre:[''],
      anos:[''],
      plan:[''],
      sede:[''],
      pensum:['']
    })
    this.getAllCarreras()
  }

  clickAddCarrera(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postCarreraDetails(){
    this.carreraModelObj.nombre = this.formValue.value.nombre;
    this.carreraModelObj.anos = this.formValue.value.anos;
    this.carreraModelObj.plan = this.formValue.value.plan;
    this.carreraModelObj.sede = this.formValue.value.sede;
    this.carreraModelObj.pensum = this.formValue.value.pensum;

    this.api.postCarrera(this.carreraModelObj).subscribe(res=>{
      console.log(res);
      alert("Carrera Agregada Exitosamente")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllCarreras();
    },
    err=>{
      alert("Algo salió mal")
    })
  }

  getAllCarreras(){
    this.api.getCarreras().subscribe(res=>{
      this.carreraData = res;
    })
  }

  deleteCarreras(car:any){
    this.api.deleteCarrera(car.id).subscribe(res=>{
      alert("Carrera Eliminada")
      this.getAllCarreras()
    })
  }

  onEdit(car:any){
    this.showAdd = false;
    this.showUpdate = true;
    this.carreraModelObj.id = car.id;
    this.formValue.controls['nombre'].setValue(car.nombre);
    this.formValue.controls['anos'].setValue(car.anos);
    this.formValue.controls['plan'].setValue(car.plan);
    this.formValue.controls['sede'].setValue(car.sede);
    this.formValue.controls['pensum'].setValue(car.pensum);
  }

  updateCarreraDetails(){
    this.carreraModelObj.nombre = this.formValue.value.nombre;
    this.carreraModelObj.anos = this.formValue.value.anos;
    this.carreraModelObj.plan = this.formValue.value.plan;
    this.carreraModelObj.sede = this.formValue.value.sede;
    this.carreraModelObj.pensum = this.formValue.value.pensum;

    this.api.updateCarrera(this.carreraModelObj, this.carreraModelObj.id).subscribe(res=>{
      alert("Carrera Actualizada");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllCarreras();
    })
  }
}
