/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Section = 'home' | 'about' | 'experience' | 'skills' | 'projects' | 'work' | 'testimonials' | 'contact' | 'process';

export type Page = 'home' | 'projects' | 'experience' | 'contact';

export interface Testimonial {
  name: string;
  email: string;
  message: string;
  date: string;
}
