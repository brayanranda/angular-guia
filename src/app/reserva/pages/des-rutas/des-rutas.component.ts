import { Component, OnInit } from '@angular/core';
import { Routes, ActivatedRoute } from '@angular/router';
import { PaqueteService } from '../../../services/paquete.service';

@Component({
  selector: 'app-des-rutas',
  templateUrl: './des-rutas.component.html',
  styleUrls: ['./des-rutas.component.css']
})
export class DesRutasComponent implements OnInit {

  id: any|null = "";
  data: any;
  data2: any; 

  constructor(private aRoutes: ActivatedRoute, private paquete: PaqueteService) { 

    this.id = this.aRoutes.snapshot.paramMap.get("idRuta");

  }
  

  ngOnInit(): void {

    this.paquete.encontrar(this.id).subscribe(data => {
      this.data=data;      
    })

    this.paquete.encontrarAct(this.id).subscribe(data2 => {
      this.data2=data2;  
      console.log(this.data2);    
    })

  }

}
