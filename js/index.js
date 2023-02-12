const btn_agregar_emp = document.querySelector("#btn_agre_emp");
const btn_verificar_lamp_emer = document.querySelector("#btn_verificar_lamp_emer");
const btn_ver_baños = document.querySelector("#btn_ver_baños");
const btn_ver_botiquin = document.querySelector("#btn_ver_botiquin");

const contenedor_dinamico  = document.getElementById("contenedor_dinamico");

document.addEventListener('DOMContentLoaded', () => {
  
    btn_agregar_emp.addEventListener('click', (e) => {
      
        e.preventDefault();
        contenedor_dinamico.innerHTML="";
        contenedor_dinamico.style.backgroundColor="gray";
        const empleados = JSON.parse( localStorage.getItem("Empleados") );
      
        if (empleados === null) {
           
            const parrafo = document.createElement("p");
            const text_parrafo = document.createTextNode("Aún no se han agregado empleados, A continuación agregue o elimine como se necesite:  ")
            parrafo.appendChild(text_parrafo);
            contenedor_dinamico.append(parrafo);
        } else {
            generador_html(empleados)
        }
           

        //Capturar Número de empleado
        contenedor_dinamico.style.paddingLeft="20px"
        parrafo = document.createElement("p");
        const text_parrafo = document.createTextNode("Número de empleado: ")
        parrafo.appendChild(text_parrafo);
        contenedor_dinamico.append(parrafo)
        const caja_texto_numemp = document.createElement('input')   
        parrafo.appendChild(caja_texto_numemp);
        //Capturar nombre del empleado
        const text_parrafo2 = document.createTextNode("Nombre: ")
        parrafo.appendChild(text_parrafo2);
        //contenedor_dinamico.append(parrafo)
        const caja_texto_nombre = document.createElement('input')   
        caja_texto_nombre.style.width="300px"
        parrafo.appendChild(caja_texto_nombre);
        const btn_agr = document.createElement('button')   
        btn_agr.style.height="25px";
        btn_agr.style.width="80px";
        btn_agr.textContent="Agregar";
        parrafo.appendChild(btn_agr);
        

        
        btn_agr.addEventListener('click', (e) => {
            if (caja_texto_numemp.value===""){
                alert("Debe de escribir un número de empleado");
                return;
            }
            if(caja_texto_nombre.value===""){
                alert("Debe de escribir el nombre del empleado");
                return;
            }
            const empleados = JSON.parse( localStorage.getItem("Empleados") )|| [];
            contenedor_dinamico.innerHTML="";
            const numero = caja_texto_numemp.value;
             const nombre = caja_texto_nombre.value;
             const empleado = { // JSON
                //  key     : value
                    'numero': numero,
                    'nombre': nombre
                }
              
                empleados.push(empleado);
                localStorage.setItem('Empleados', JSON.stringify(empleados));
                caja_texto_numemp.value="";
                caja_texto_nombre.value="";

                // llena el contenido del div ..
                
                generador_html(empleados)
                btn_agregar_emp.click();
        })
      
        function generador_html(empleados) {
            contenedor_dinamico.innerHTML="";
            for(let i = 0; i < empleados.length; i++) {     
                  
                const empleados_div = document.createElement("div");
                const texto_empleados = document.createTextNode(`Numero de empleado:  ${empleados[i].numero} Nombre: ${empleados[i].nombre}  `);
    
                const btn_eliminar = document.createElement('button')   ;
                btn_eliminar.textContent="Eliminar";
               
                const btn_Actualizar = document.createElement('button')   ;
                btn_Actualizar.textContent="Actualizar";
               
    
    
                btn_eliminar.onclick = () => {
                    eliminardeLocalStorage(i, empleados)
                }
    
                btn_Actualizar.onclick = () => {
                  
                   
                    caja_texto_numemp.value = empleados[i].numero;
                    caja_texto_nombre.value = empleados[i].nombre;
                    
                    btn_agr.disabled = true;
    
                   btn_Actualizar.hidden=true;
                   btn_eliminar.hidden=true;
                    const btn_guardar = document.createElement('button');
                    btn_guardar.textContent='Guardar';
                    empleados_div.appendChild(btn_guardar);
    
                    //lo siguiente para tener almacenado en el boton el identificador del elemento del arreglo
                    btn_guardar.id = i;
    
                    btn_guardar.onclick = (e) => {
                        e.preventDefault()
                        // actualizar informacion ..
    
                        const empleado = { // JSON
                            //  key     : value
                                'numero': caja_texto_numemp.value,
                                'nombre': caja_texto_nombre.value
                            }
                      
    
                            empleados.splice(i, 1, empleado); // actualizacion ...
    
                        localStorage.setItem('Empleados', JSON.stringify(empleados));
    
                        contenedor_dinamico.innerHTML = "";
                        generador_html(empleados);
                        alert("Elemento exitosamente modificado")
                        btn_guardar.hidden = true;
                        btn_agregar_emp.click();
                        
                    }
    
                    //form.appendChild(btn_guardar);
                }
    
                // Agregar textos y buton ...
                
                empleados_div.appendChild(texto_empleados);
                empleados_div.appendChild(btn_Actualizar);
                empleados_div.appendChild(btn_eliminar);
                
                contenedor_dinamico.appendChild(empleados_div);
                
                
            }
        }
        function eliminardeLocalStorage(i, empleados){
    
            empleados.splice(i, 1);
            localStorage.setItem('Empleados', JSON.stringify(empleados));
            contenedor_dinamico.innerHTML= '';
            generador_html(empleados)
            btn_agregar_emp.click();
        }
    })
    
})