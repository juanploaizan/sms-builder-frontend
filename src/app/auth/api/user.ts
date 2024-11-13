export interface User {
  id: number;
  nombreUsuario: string;
  email: string;
  estado: string;
  roles: {
    id: number;
    name: string;
  }[];
}

/*
{
    "id": "b04e95e5-1d51-4ecd-bf5e-fcb64d2d30d2",
    "nombreUsuario": "root",
    "clave": "12345",
    "estado": "ACTIVO",
    "intentos": 0,
    "roles": [
        {
            "id": "1",
            "nombre": "Administrador",
            "recursos": [
                {
                    "id": "7871eadf-fea9-4736-8f2c-2c0d3e9c50d3",
                    "nombre": "administracion",
                    "url": "/administracion/index.xhtml",
                    "publico": false
                },
                {
                    "id": "db416b5f-f599-4854-9dff-cb3dab552163",
                    "nombre": "seguridad_recurso",
                    "url": "/seguridad/recurso/index.xhtml",
                    "publico": false
                },
                {
                    "id": "e8487d63-2594-4e71-9605-fcc88277ac44",
                    "nombre": "seguridad_rol",
                    "url": "/seguridad/rol/index.xhtml",
                    "publico": false
                },
                {
                    "id": "232a0319-04df-4ed7-9649-8bdb0053430c",
                    "nombre": "seguridad_usuario",
                    "url": "/seguridad/usuario/index.xhtml",
                    "publico": false
                },
                {
                    "id": "5d8e75e9-cec8-4321-bb3c-57a796384583",
                    "nombre": "seguridad_usuario_actualizar",
                    "url": "/seguridad/usuario/actualizar.xhtml",
                    "publico": false
                },
                {
                    "id": "b4ef7a06-398f-4212-bd32-2efcd3af3dfe",
                    "nombre": "backup_importar",
                    "url": "/backup/importar.xhtml",
                    "publico": false
                },
                {
                    "id": "27e1c963-bb8b-45b1-b9cc-d968dcb16488",
                    "nombre": "revision_editarRevision",
                    "url": "/revision/editarRevision.xhtml",
                    "publico": false
                },
                {
                    "id": "8963247f-2bc2-4eb1-9cc2-c5f2203fee2f",
                    "nombre": "objetivo_registro",
                    "url": "/objetivo/registro.xhtml",
                    "publico": false
                },
                {
                    "id": "14aca569-6a7b-48f0-ba7a-196154207fd1",
                    "nombre": "pregunta_registro",
                    "url": "/pregunta/registro.xhtml",
                    "publico": false
                },
                {
                    "id": "ef519ece-6cc4-4f7f-941a-545e47fb41a0",
                    "nombre": "termino_registro",
                    "url": "/termino/registro.xhtml",
                    "publico": false
                },
                {
                    "id": "6c5dfda1-8b27-4cfd-ab56-f62faf68e33c",
                    "nombre": "atributocalidad_registro",
                    "url": "/atributocalidad/registro.xhtml",
                    "publico": false
                },
                {
                    "id": "75a44310-fbd8-47c4-b7f0-c72aec43b4a3",
                    "nombre": "fuente_registro",
                    "url": "/fuente/registro.xhtml",
                    "publico": false
                },
                {
                    "id": "14c3ef30-b734-41d5-b937-675378d46fd9",
                    "nombre": "criterioseleccion_registro",
                    "url": "/criterioseleccion/registro.xhtml",
                    "publico": false
                },
                {
                    "id": "d55757a7-19bf-429f-98ae-a6c6e7a681ed",
                    "nombre": "cadenabusqueda_registro",
                    "url": "/cadenabusqueda/registro.xhtml",
                    "publico": false
                },
                {
                    "id": "8ff03f1b-04b9-4ce7-a11b-c0cbd249d1fd",
                    "nombre": "revision_importarReferencias",
                    "url": "/revision/importarReferencias.xhtml",
                    "publico": false
                },
                {
                    "id": "5aab9d7f-e539-423f-9e2f-2b14820b9526",
                    "nombre": "revision_importarReferenciasBaseDatos",
                    "url": "/revision/importarReferenciasBaseDatos.xhtml",
                    "publico": false
                },
                {
                    "id": "a9baefa1-dc64-4c35-8304-b1d4bd48174a",
                    "nombre": "revision_importarReferenciasManual",
                    "url": "/revision/importarReferenciasManual.xhtml",
                    "publico": false
                },
                {
                    "id": "57d9766e-9efc-4762-a431-acc145fc5894",
                    "nombre": "revision_importarReferenciasBolaNieve",
                    "url": "/revision/importarReferenciasBolaNieve.xhtml",
                    "publico": false
                },
                {
                    "id": "024f48c6-7a7b-4bbf-a23b-22f36b9974a9",
                    "nombre": "revision_gestionarReferenciasRepetidas",
                    "url": "/revision/gestionarReferenciasRepetidas.xhtml",
                    "publico": false
                },
                {
                    "id": "151e55d6-b3d0-4246-9ca4-45fd084958fa",
                    "nombre": "referencia_aplicarCriterios",
                    "url": "/referencia/aplicarCriterios.xhtml",
                    "publico": false
                },
                {
                    "id": "0843364f-03f8-4870-8570-2df18104a68c",
                    "nombre": "revision_resumenReferenciasSeleccionadas",
                    "url": "/revision/resumenReferenciasSeleccionadas.xhtml",
                    "publico": false
                },
                {
                    "id": "27c2f467-522e-4eaa-ae94-e6287c6c6ff6",
                    "nombre": "referencia_adicionarCitas",
                    "url": "/referencia/adicionarCitas.xhtml",
                    "publico": false
                },
                {
                    "id": "b7835c08-4be3-41a3-9fda-aad54b66cf40",
                    "nombre": "calidad_evaluarReferencias",
                    "url": "/calidad/evaluarReferencias.xhtml",
                    "publico": false
                },
                {
                    "id": "c511b390-a59a-4254-bd6c-9dd3ed5f1a9e",
                    "nombre": "referencia_analizar",
                    "url": "/referencia/analizar.xhtml",
                    "publico": false
                }
            ]
        },
        {
            "id": "2",
            "nombre": "Usuario",
            "recursos": [
                {
                    "id": "47045f03-3937-4124-97fb-c5e86d99a751",
                    "nombre": "sms",
                    "url": "/sms.xhtml",
                    "publico": false
                },
                "5d8e75e9-cec8-4321-bb3c-57a796384583",
                {
                    "id": "5202f560-76c6-46a4-85d5-aa2f42f4b4b6",
                    "nombre": "referencia_navegar",
                    "url": "/referencia/navegar.xhtml",
                    "publico": false
                },
                {
                    "id": "8d0e5caf-a7f7-475a-87ca-fef95beb45b4",
                    "nombre": "referencia_navegar?all=true",
                    "url": "/referencia/navegar.xhtml?all=true",
                    "publico": false
                },
                {
                    "id": "4a0fde23-ad1d-41a9-ab5c-c4324f46c9a2",
                    "nombre": "proceso_registro",
                    "url": "/proceso/registro.xhtml",
                    "publico": false
                },
                {
                    "id": "2765bf2f-ab5d-417c-9772-215205fdcc51",
                    "nombre": "referencia_editar",
                    "url": "/referencia/editar.xhtml",
                    "publico": false
                },
                {
                    "id": "94ed91fe-1b05-47ce-b20a-d63a790fe835",
                    "nombre": "calidad_evaluarReferencia",
                    "url": "/calidad/evaluarReferencia.xhtml",
                    "publico": false
                },
                {
                    "id": "3c680e8b-a75c-40de-b204-b5148a1ebcc8",
                    "nombre": "calidad_resumenEvaluacionReferencias",
                    "url": "/calidad/resumenEvaluacionReferencias.xhtml",
                    "publico": false
                },
                {
                    "id": "af6ebb6f-c63b-44ab-bec5-1bc883752c7f",
                    "nombre": "calidad_resumenEvaluacionReferenciasAtributo",
                    "url": "/calidad/resumenEvaluacionReferenciasAtributo.xhtml",
                    "publico": false
                },
                {
                    "id": "c9b6d79e-4222-44c9-8a8e-977c01923f9d",
                    "nombre": "revision_registroReferencias",
                    "url": "/revision/registroReferencias.xhtml",
                    "publico": false
                },
                {
                    "id": "1aa59d13-6bf1-422c-9395-0cecd8976260",
                    "nombre": "revision_resumenReferenciasDestacadas",
                    "url": "/revision/resumenReferenciasDestacadas.xhtml",
                    "publico": false
                },
                {
                    "id": "b4ed15ba-cced-4c66-99cc-ae71d1c190c1",
                    "nombre": "revision_revisores",
                    "url": "/revision/revisores/index.xhtml",
                    "publico": false
                },
                {
                    "id": "8387f7a6-266a-4bde-b24e-739c8aa7fce3",
                    "nombre": "estadisticas_palabrasClave",
                    "url": "/estadisticas/palabrasClave.xhtml",
                    "publico": false
                },
                {
                    "id": "d40b4462-9c33-48e0-9cf4-410e1a0ad240",
                    "nombre": "estadisticas_referenciaPalabrasClave",
                    "url": "/estadisticas/referenciaPalabrasClave.xhtml",
                    "publico": false
                },
                {
                    "id": "445dc160-b1b8-4a94-830d-d76d0dff9c8d",
                    "nombre": "estadisticas_referenciasCalidadYear",
                    "url": "/estadisticas/referenciasCalidadYear.xhtml",
                    "publico": false
                },
                {
                    "id": "da1ab2a2-59ac-4bff-bff7-0c7f3bfbbe31",
                    "nombre": "estadisticas_referenciasPregunta",
                    "url": "/estadisticas/referenciasPregunta.xhtml",
                    "publico": false
                },
                {
                    "id": "62143f3e-0398-4767-80ab-bfdb181c8a42",
                    "nombre": "estadisticas_referenciasTipo",
                    "url": "/estadisticas/referenciasTipo.xhtml",
                    "publico": false
                },
                {
                    "id": "d5233910-3d18-4755-b7f6-3f0fc7a83b44",
                    "nombre": "estadisticas_referenciasTipoFuente",
                    "url": "/estadisticas/referenciasTipoFuente.xhtml",
                    "publico": false
                },
                {
                    "id": "974742fd-47c9-4d9a-b2be-3cf84dc8ff17",
                    "nombre": "estadisticas_referenciasTermino",
                    "url": "/estadisticas/referenciasTermino.xhtml",
                    "publico": false
                },
                {
                    "id": "101fc059-dae8-466c-b648-f48f7224b331",
                    "nombre": "estadisticas_referenciasTopico",
                    "url": "/estadisticas/referenciasTopico.xhtml",
                    "publico": false
                },
                {
                    "id": "8e4b4aba-35cf-49bb-b306-1689a814bc1c",
                    "nombre": "estadisticas_referenciasTopicoAtributoCalidad",
                    "url": "/estadisticas/referenciasTopicoAtributoCalidad.xhtml",
                    "publico": false
                },
                {
                    "id": "403bc7d7-9e3f-4e74-81d6-89a3b3cbd7d9",
                    "nombre": "estadisticas_referenciasYear",
                    "url": "/estadisticas/referenciasYear.xhtml",
                    "publico": false
                },
                {
                    "id": "9b81ef04-dcf7-4da1-9570-ce870aa95b37",
                    "nombre": "estadisticas_tablaReferenciasPreguntas",
                    "url": "/estadisticas/tablaReferenciasPreguntas.xhtml",
                    "publico": false
                },
                {
                    "id": "201e68a8-f68b-4499-8ecf-cd64a6f0756b",
                    "nombre": "estadisticas_tablaReferenciasTopicos",
                    "url": "/estadisticas/tablaReferenciasTopicos.xhtml",
                    "publico": false
                },
                {
                    "id": "3e6f15da-8c4f-4ba9-b736-cf3a085c3a74",
                    "nombre": "ayuda_proceso",
                    "url": "/ayuda/proceso.xhtml",
                    "publico": false
                }
            ]
        }
    ],
    "nombre": "root",
    "email": "root@email.com",
    "pasoActual": {
        "id": "33b853a7-b3db-4398-9b65-bb4d1ab0c7ad",
        "orden": 22,
        "paso": {
            "@id": "a7439ce7-f01e-42bd-ad6c-8f0f2679ef4a",
            "id": "eee4b3ba-2f7d-4c32-b097-94054f890b64",
            "nombre": "etiquetaMenuRevisionEditar",
            "recurso": "27e1c963-bb8b-45b1-b9cc-d968dcb16488",
            "forFilter": false
        },
        "referencias": []
    }
}
*/
