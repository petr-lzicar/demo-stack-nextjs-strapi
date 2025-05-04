export default ({env}) => ({
    navigation: {
        enabled: true,
        config: {
            // additionalFields: ['audience', { name: 'my_custom_field', type: 'boolean', label: 'My custom field' }],
            contentTypes: ['api::page.page'],
            contentTypesNameFields: {
                'api::page.page': ['title']
            },
            pathDefaultFields: {
                'api::page.page': ['slug']
            },
            i18nEnabled: true,
            allowedLevels: 3,
        }
    },
    upload: {
        config: {
            provider: 'aws-s3',
            providerOptions: {
                accessKeyId: env('AWS_ACCESS_KEY_ID'),
                secretAccessKey: env('AWS_ACCESS_SECRET'),
                region: env('AWS_REGION'),
                params: {
                    Bucket: env('AWS_BUCKET'),
                },
            },
            actionOptions: {
                upload: {},
                uploadStream: {},
                delete: {},
            },
        },
    },

});
