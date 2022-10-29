import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  //cambios para git
  // Alumnos
  postAlumno(data:any){
    return this.http.post<any>("http://localhost:3000/alumnos", data).pipe(map((res:any)=>{
      return res;
    }))
  }
  getAlumnos(){
    return this.http.get<any>("http://localhost:3000/alumnos").pipe(map((res:any)=>{
      return res;
    }))
  }
  updateAlumno(data:any, id:number){
    return this.http.put<any>("http://localhost:3000/alumnos/"+id, data).pipe(map((res:any)=>{
      return res;
    }))
  }
  deleteAlumno(id:number){
    return this.http.delete<any>("http://localhost:3000/alumnos/"+id).pipe(map((res:any)=>{
      return res;
    }))
  }

  // Carreras
  postCarrera(data:any){
    return this.http.post<any>("http://localhost:3000/carreras", data).pipe(map((res:any)=>{
      return res;
    }))
  }
  getCarreras(){
    return this.http.get<any>("http://localhost:3000/carreras").pipe(map((res:any)=>{
      return res;
    }))
  }
  updateCarrera(data:any, id:number){
    return this.http.put<any>("http://localhost:3000/carreras/"+id, data).pipe(map((res:any)=>{
      return res;
    }))
  }
  deleteCarrera(id:number){
    return this.http.delete<any>("http://localhost:3000/carreras/"+id).pipe(map((res:any)=>{
      return res;
    }))
  }

  // Cursos
  postCurso(data:any){
    return this.http.post<any>("http://localhost:3000/cursos", data).pipe(map((res:any)=>{
      return res;
    }))
  }
  getCursos(){
    return this.http.get<any>("http://localhost:3000/cursos").pipe(map((res:any)=>{
      return res;
    }))
  }
  updateCurso(data:any, id:number){
    return this.http.put<any>("http://localhost:3000/cursos/"+id, data).pipe(map((res:any)=>{
      return res;
    }))
  }
  deleteCurso(id:number){
    return this.http.delete<any>("http://localhost:3000/cursos/"+id).pipe(map((res:any)=>{
      return res;
    }))
  }

  // Maestros
  postMaestro(data:any){
    return this.http.post<any>("http://localhost:3000/maestros", data).pipe(map((res:any)=>{
      return res;
    }))
  }
  getMaestros(){
    return this.http.get<any>("http://localhost:3000/maestros").pipe(map((res:any)=>{
      return res;
    }))
  }
  updateMaestro(data:any, id:number){
    return this.http.put<any>("http://localhost:3000/maestros/"+id, data).pipe(map((res:any)=>{
      return res;
    }))
  }
  deleteMaestro(id:number){
    return this.http.delete<any>("http://localhost:3000/maestros/"+id).pipe(map((res:any)=>{
      return res;
    }))
  }
}
