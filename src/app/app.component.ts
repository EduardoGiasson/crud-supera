import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgbModule, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgbModule, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('drawerContent', { static: true })
  drawerContent!: TemplateRef<any>;
  title = 'projeto';
  form!: FormGroup;
  list = [
    { id: 1, nome: 'João Silva', cpf: 12345678901, telefone: 11987654321 },
    { id: 2, nome: 'Maria Oliveira', cpf: 23456789012, telefone: 11976543210 },
    { id: 3, nome: 'Carlos Santos', cpf: 34567890123, telefone: 11965432109 },
  ];
  editar: boolean = false;

  constructor(private offcanvasService: NgbOffcanvas, private fb: FormBuilder) {
    this.form = this.fb.group({
      id: ['', Validators.required],
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      telefone: ['', Validators.required],
    });
  }

  excluir(id: number) {
    const index = this.list.findIndex((el) => el.id === id);
    this.list.splice(index, 1);
  }

  openOffcanvas(obj?: any) {
    const ref = this.offcanvasService.open(this.drawerContent, {
      ariaLabelledBy: 'offcanvas-basic-title',
    });

    if (obj) {
      this.form.setValue(obj);
      this.editar = true;
    } else {
      this.form.reset();
    }
  }

  salvar() {
    const obj = this.form.value;

    if (this.editar) {
      const index = this.list.findIndex((el) => el.id === obj.id);
      if (index !== -1) {
        this.list[index] = { ...this.list[index], ...obj };
      }
      this.editar = false;
    } else {
      let idMaior = 0;
      for (let obj of this.list) {
        if (idMaior < obj.id) {
          idMaior = obj.id;
        }
      }
      obj.id = idMaior + 1;
      this.list.push(obj);
    }

    this.offcanvasService.dismiss();
  }
}
