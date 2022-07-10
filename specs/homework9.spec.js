import { Email, EmailBuilder } from '../framework/index'

const header = {
    apilayer: {
        apikey: 'tv2wTdFNNY7g1oFovkQVk5T3tePqadNd'
    }
};

const failedResponses = {
    Invalid_Authentication : {code : 401, message : 'Invalid authentication credentials'},
    NoApiKey : {code : 401, message : 'No API key found in request'},
    NoEmailAddress : {code : 401, message : 'no_email_address_spplied'},
    FormatNotValid : {code : 401, message : 'format_not_valid'},
};

describe('Test ApiLayer ', () => {
    test('Email with invalid api_key, expect 401', async () => {
        const email = new EmailBuilder().addLogin().addDomain().generateValidEmail();

        const response = await Email.verifyByEmailAsync(email, "InvalidApiKey");
        const data = await response.json();
        expect(response.status).toEqual(failedResponses.Invalid_Authentication.code);
        expect(data.message).toEqual(failedResponses.Invalid_Authentication.message);
    }, 15000);

    test('Validate email without api_key, expect 401', async () => {
        const email = new EmailBuilder().addLogin().addDomain().generateValidEmail();

        const response = await Email.verifyByEmailAsync(email);
        const data = await response.json();
        expect(response.status).toEqual(failedResponses.NoApiKey.code);
        expect(data.message).toEqual(failedResponses.NoApiKey.message);
    }, 10000);

    test('Success email validation, expect 200', async () => {
        const email = new EmailBuilder().addLogin().addDomain().generateValidEmail();
        const response = await Email.verifyByEmailAsync(email, header.apilayer.apikey);
        const data = await response.json();
        expect(response.status).toEqual(200);
        expect(data.email).toEqual(email);
        expect(data.format_valid).toEqual(true);
    }, 10000);

    test.each`
    email                           | expected
    ${''}                           | ${failedResponses.NoEmailAddress.message}
    ${'invalid.com'}                | ${failedResponses.FormatNotValid.message}
    ${'invalid@.ru'}                | ${failedResponses.FormatNotValid.message}
    ${'@.ru'}                       | ${failedResponses.FormatNotValid.message}
    ${'invalid@inv.'}               | ${failedResponses.FormatNotValid.message}
    `('$email - $expected', async ({ email, expected }) => {
        const response = await Email.verifyByEmailAsync(email, header.apilayer.apikey)
        const data = await response.json()
        expect(data.error.type).toEqual(expected)
    }, 10000);


})