import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  @Input() anchura: number;

  constructor() { }

  ngOnInit() {
    $("#btn_contact").click(function(e){
      e.preventDefault();

       var valor = "<p>"+$("#prueba").val()+"</p>";
      $("#apareceAqui").append(valor);
    });

    /*$('#galeria').bxSlider({
      mode:'fade',
      captions: false,
      slideWidth:600
    });*/
  }

}
