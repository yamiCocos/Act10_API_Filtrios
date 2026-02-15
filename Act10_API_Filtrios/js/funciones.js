const { createApp } = Vue;

createApp({

    data() {                         //arreglos
        return {
            personajes: [],
            personajesFiltrados: [],
            personajeSeleccionado: {}
        }
    },

    mounted() {
        fetch("https://dragonball-api.com/api/characters?limit=20")
            .then(res => res.json())
            .then(data => {

                this.personajes = data.items.map(p => ({ //metodo para la informacion que va a aparecer dentro del detalle
                    id: p.id,
                    name: p.name,
                    gender: p.gender || "Desconocido",
                    description: p.description || "Sin información",
                    race: p.race || "Desconocido",
                    ki: p.ki || "Desconocido",
                    image: p.image 
                }));

                this.personajesFiltrados = this.personajes;
            })
            .catch(error => console.log(error));
    },

    methods: { //metodo para filtrar personajes por raza
        filtrarPorCategoria(categoria) {
            if (categoria === 'Todos') {
                this.personajesFiltrados = this.personajes;
            } else {
                this.personajesFiltrados = this.personajes.filter(p =>
                    p.race && p.race.includes(categoria)
                );
            }
        },

        verDetalle(personaje) {  //busca el personaje por ID
            this.personajeSeleccionado = personaje;
            const modal = new bootstrap.Modal(
                document.getElementById('detalleModal')
            );
            modal.show();
        }

    }

}).mount('#app');
