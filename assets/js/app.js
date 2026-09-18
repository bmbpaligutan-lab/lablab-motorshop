import { supabase, requireConfig } from './supabase.js';

export const money = n => new Intl.NumberFormat('en-PH',{style:'currency',currency:'PHP'}).format(Number(n||0));
export const esc = s => String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
export async function session(){ const {data}=await supabase.auth.getSession(); return data.session; }
export async function profile(){ const s=await session(); if(!s) return null; const {data,error}=await supabase.from('profiles').select('*').eq('id',s.user.id).single(); if(error) throw error; return data; }
export async function guard(roles=[]){ requireConfig(); const p=await profile(); if(!p){ location.href='../auth/login.html'; return null; } if(roles.length&&!roles.includes(p.role)){ location.href=p.role==='customer'?'../customer/dashboard.html':'../admin/dashboard.html'; return null; } return p; }
export async function signOut(){ await supabase.auth.signOut(); location.href='../auth/login.html'; }
export function flash(msg,type='danger'){ const el=document.getElementById('flash'); if(el){el.innerHTML=`<div class="alert alert-${type}">${esc(msg)}</div>`; setTimeout(()=>el.innerHTML='',4000);}}
export async function initUser(){ const p=await profile(); document.querySelectorAll('[data-user-name]').forEach(e=>e.textContent=p?.first_name||p?.username||'User'); document.querySelectorAll('[data-user-role]').forEach(e=>e.textContent=p?.role||''); return p; }
export function wireLogout(){ document.querySelectorAll('[data-logout]').forEach(b=>b.addEventListener('click',async e=>{e.preventDefault();await signOut();})); }
