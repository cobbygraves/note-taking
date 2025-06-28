import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-no-post',
  imports: [RouterLink, CommonModule],
  templateUrl: './no-post.component.html',
  styleUrl: './no-post.component.scss',
})
export class NoPostComponent {}
