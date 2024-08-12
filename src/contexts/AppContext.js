import React, { createContext, useState } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const postsSampleData = [
    {
      id: 16,
      user: "tony",
      date: "7 days ago",
      title: "how do i center a div?",
      content: "the question speaks for itself, anyone know?",
      votes: 8,
      upVote: false,
      downVote: false,
      comments: [
        {
          id: 1,
          user: "lacy",
          comment: "hmm thats a hard one",
          date: "5 days ago",
        },
        {
          id: 2,
          user: "henry",
          comment: "yeah no clue",
          date: "3 days ago",
        },
      ],
      liked: false,
      postedByUser: false,
    },
    {
      id: 17,
      user: "jeffrey",
      date: "1 week ago",
      title: "what happened to all the dev jobs?",
      content: "i can't seem to get any interviews, any tips?",

      votes: 99,
      upVote: false,
      downVote: false,
      img: "poor.jpeg",

      comments: [
        {
          id: 3,
          user: "steve",
          comment: "i thought software dev jobs were a myth",
          date: "1 days ago",
        },
        {
          id: 4,
          user: "francis",
          comment: "have you tried freecodecamp?",
          date: "2 days ago",
        },
      ],
      liked: false,
      postedByUser: false,
    },
  ];

  const communitiesSampleData = [
    {
      id: 1,
      community: "webdev",
      picture: "/webdev.png",
      posts: [
        {
          id: 18,
          user: "sparky",
          date: "2 weeks ago",
          title: "what language should i learn first? javascript or python?",
          content:
            "new to software dev, any recommendations on what language i should learn first?",

          votes: 3,
          upVote: false,
          downVote: false,

          comments: [
            {
              id: 4,
              user: "shaggy",
              comment: "javascript is the best",
              date: "3 days ago",
            },
            {
              id: 5,
              user: "emma",
              comment: "it doesnt matter just start coding",
              date: "1 days ago",
            },
          ],
          liked: false,
          postedByUser: false,
        },
      ],
      following: false,
    },

    {
      id: 2,
      community: "fitness",
      picture: "/fitness.png",
      posts: [],
      following: false,
    },
    {
      id: 3,
      community: "career",
      picture: "/career.png",
      posts: [
        {
          id: 11,
          user: "rich-ryan",
          date: "8 weeks ago",
          title: "whats the quickest way to get rich in your early 20's?",
          content:
            "i have no uni degree or any valuable work experience really, any recommendations on what careers i could get into?",

          votes: 6,
          upVote: false,
          downVote: false,

          comments: [
            {
              id: 6,
              user: "mark",
              comment: "invest in stocks",
              date: "7 days ago",
            },
          ],
          liked: false,
          postedByUser: false,
        },
      ],
      following: false,
    },
    {
      id: 4,
      community: "news",
      picture: "/news.png",
      posts: [
        {
          id: 12,
          user: "realist",
          date: "5 days ago",
          title: "have you guys seen the news lately?",
          content:
            "i cant believe what I just watched on the news. Its like journalism is officially dead. Every single channel is running the same recycled garbage, and not one of them has a shred of originality or integrity left. What happened to investigative journalism? What happened to actual reporting where they dig into the facts instead of just parroting whatever press release comes their way? And dont even get me started on the bias! Its like every network has an agenda, and they’re not even trying to hide it anymore. I dont care what side of the political spectrum youre on, its all just noise and sensationalism now. Theyre more interested in getting clicks and eyeballs than telling us whats really going on.",

          votes: 18,
          upVote: false,
          downVote: false,

          comments: [
            {
              id: 7,
              user: "brad",
              comment: "who still watches the news, its 2024",
              date: "2 days ago",
            },
          ],
          liked: false,
          postedByUser: false,
        },
      ],
      following: false,
    },
    {
      id: 5,
      community: "movies",
      picture: "/movies.png",
      posts: [],
      following: false,
    },
    {
      id: 6,
      community: "university",
      picture: "/university.png",
      posts: [
        {
          id: 13,
          user: "smartest",
          date: "8 weeks ago",
          title: "higher education is a scam",
          content:
            "can someone explain to me why Im paying a fortune for this so-called 'education'? because at this point, it feels like im just throwing money into a black hole and getting nothing in return",

          votes: 14,
          upVote: false,
          downVote: false,

          comments: [
            {
              id: 8,
              user: "frank",
              comment: "100% agree",
              date: "1 days ago",
            },
          ],
          liked: false,
          postedByUser: false,
        },
      ],
      following: false,
    },
    {
      id: 7,
      community: "sports",
      picture: "/sports.png",
      posts: [],
      following: false,
    },
    {
      id: 8,
      community: "lifestyle",
      picture: "/lifestyle.png",
      posts: [
        {
          id: 14,
          user: "lean-dean",
          date: "8 weeks ago",
          title: "i just tried keto diet for the first time and its amazing",
          content:
            "the other day someone told me about keto, and i decided to give it ago, best decision of my life",

          votes: 35,
          upVote: false,
          downVote: false,

          comments: [
            {
              id: 9,
              user: "clark",
              comment: "i might just give it a go",
              date: "2 days ago",
            },
          ],
          liked: false,
          postedByUser: false,
        },
      ],
      following: false,
    },
    {
      id: 9,
      community: "tips",
      picture: "/tips.png",
      posts: [],
      following: false,
    },
    {
      id: 10,
      community: "music",
      picture: "/music.png",
      posts: [
        {
          id: 15,
          user: "music-enjoyer",
          date: "8 weeks ago",
          title: "looking for new music to listen to, any recommendations?",
          content:
            "just like the title says im looking for new music recommendations, i like all types of genres.",

          votes: 23,
          upVote: false,
          downVote: false,

          comments: [
            {
              id: 10,
              user: "johnny",
              comment: "give frank ocean a try",
              date: "3 days ago",
            },
          ],
          liked: false,
          postedByUser: false,
        },
      ],
      following: false,
    },
  ];

  const [newPostId, setNewPostId] = useState(19);

  const [communityNameId, setCommunityNameId] = useState("");

  const [communityData, setCommunityData] = useState(communitiesSampleData);

  const [likedPosts, setLikedPosts] = useState([]);

  const [allFollowing, setAllFollowing] = useState([]);

  const [like, setLike] = useState("fav.svg");

  const [posts, setPosts] = useState(postsSampleData);

  const [newCommentId, setNewCommentId] = useState(11);

  const isLiked = (postId) => {
    return likedPosts.some((likedPost) => likedPost.id === postId);
  };

  const addLikedPost = (post) => {
    setLikedPosts((prevLikedPosts) => [...prevLikedPosts, post]);
  };

  const removeLikedPost = (postId) => {
    setLikedPosts((prevLikedPosts) =>
      prevLikedPosts.filter((fav) => fav.id !== postId)
    );
  };

  return (
    <AppContext.Provider
      value={{
        like,
        setLike,
        likedPosts,
        setLikedPosts,
        posts,
        setPosts,
        postsSampleData,
        removeLikedPost,
        addLikedPost,
        isLiked,
        communitiesSampleData,
        allFollowing,
        setAllFollowing,
        communityData,
        setCommunityData,
        communityNameId,
        setCommunityNameId,
        newCommentId,
        setNewCommentId,
        newPostId,
        setNewPostId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
