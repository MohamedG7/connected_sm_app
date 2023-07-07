export const createPostMutation = `
    mutation CreatePost($input: CreatePostInput!) {
        CreatePostInput(input: $input) {
            post {
                id
                title
                description
                image
                createdBy {
                    username
                    email
                }
            }
        }
    }
`;