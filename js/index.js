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
        const empleados = JSON.parse( localStorage.getItem("empleados") );
        
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
        contenedor_dinamico.append(parrafo)
        const caja_texto_nombre = document.createElement('input')   
        caja_texto_nombre.style.width="300px"
        parrafo.appendChild(caja_texto_nombre);
        const btn_agr = document.createElement('button')   
        btn_agr.textContent="Agregar";
        parrafo.appendChild(btn_agr);
        

        
        btn_agr.addEventListener('click', (e) => {
            caja_texto_nombre.value=caja_texto_numemp.value
            const numero = caja_texto_numemp.value;
             const nom = caja_texto_nombre.value;
             const empleado = { // JSON
                //  key     : value
                    'numero': numero,
                    "nombre": nombre
                }
                empleados.push(empleado);
                localStorage.setItem('Empleados', JSON.stringify(empleados));
                alert("prueba")
                contenedor_dinamico.innerHTML = ''; // Limpia el contenido de un div ...

                // llena el contenido del div ..
                generador_html(empleados)
        })
      
      
    })
    function generador_html(empleados) {
        for(let i = 0; i < empleados.length; i++) {         
            const empleados_div = document.createElement("div");
            const texto_empleados = document.createTextNode(`Numero de empleado:  ${empleados[i].numero} Nombre: ${empleados[i].nombre}`);

            const btn_eliminar = document.createElement('button')   ;
            btn_eliminar.textContent="Eliminar";
           
            const btn_Actualizar = document.createElement('button')   ;
            btn_Actualizar.textContent="Actualizar";
           


            btn_eliminar.onclick = () => {
                deleteLocalStorage(i, empleados)
            }

            btn_Actualizar.onclick = () => {
                // cargar elementos en el formulario ...
                caja_texto_numemp.value = empleados[i].numero;
                caja_texto_nombre.value = empleados[i].nombre;
                
                btn_agr.disabled = true;

               
                const btn_guardar = document.createElement('button');
                btn_guardar.textContent='Guardar';

                //lo siguiente para tener almacenado en el boton el identificador del elemento del arreglo
                btn_guardar.id = i;

                btn_guardar.onclick = (e) => {
                    e.preventDefault()
                    // actualizar informacion ..

                    const empleado = { // JSON
                        //  key     : value
                            'numero': caja_texto_numemp.value,
                            "nombre": caja_texto_nombre.value
                        }
                  

                        empleados.splice(i, 1, empleado); // actualizacion ...

                    localStorage.setItem('Empleados', JSON.stringify(empleados));

                    content_div.innerHTML = "";
                    generador_html(celulares);

                    btn_guardar.hidden = true;
                }

                form.appendChild(btn_guardar);
            }

            // Agregar textos y buton ...
            empleados_div.appendChild(texto_empleados);
            empleados_div.appendChild(btn_Actualizar);
            empleados_div.appendChild(btn_eliminar);

            contenedor_dinamico.appendChild(div_celular);
        }
    }
})