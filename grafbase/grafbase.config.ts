import { g, auth, config } from '@grafbase/sdk';

// @ts-ignore
const User = g.model('User', {
  username: g.string().length({ min: 2, max: 100 }),
  email: g.email().unique(),
  password: g.string().length({ min: 6, max: 22 }),
  avatarUrl: g.url(),
  coverPic: g.url(),
  city: g.string(),
  followers: g.string().list().default([]),
  following: g.string().list().default([]),
  isAdmin: g.boolean(),
  from: g.string(),
  bio: g.string().length({ min: 10, max: 1000 }).optional(),
  posts: g.relation(() => Post).list().optional(),
});

const Post = g.model('Post', {
  title: g.string().length({ min: 3 }),
  description: g.string(), 
  image: g.url(),
  createdBy: g.relation(() => User),
});

const Conversation = g.model('Conversation', {
  members: g.string().list()
});

const Message = g.model('Message', {
  conversationId: g.string(),
  sender: g.string(),
  text: g.string()
});

export default config({
  schema: g
})
