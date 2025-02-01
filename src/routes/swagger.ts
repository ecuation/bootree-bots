import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Bootree bots API',
            version: '1.0.0',
            description: 'bots microservice',
        },
        servers: [
            {
                url: 'http://bootree.test',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes/**/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec };