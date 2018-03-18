const autoprefixer = require('autoprefixer');
const pathPrefix = '/blog';
let siteUrl = 'http://xiangsongtao.com/';
let trackingId = 'UA-114740261-3';

if (process.env.CI && process.env.DEPLOY === 'github') {
    trackingId = 'UA-114740261-4';
    siteUrl = 'https://xiangsongtao.github.io' + pathPrefix;
}

module.exports = {
    // gatsby build --prefix-paths
    // When running the command without the --prefix-paths flag, Gatsby ignores your pathPrefix.
    pathPrefix: pathPrefix,
    siteMetadata: {
        title: `Attila`,
        cover: '/background/6.jpg',
        description: `Thoughts, stories and ideas.`, // 网站描述
        keywords: `Thoughts, stories and ideas.`, // 网站描述
        tagCover: '/background/5.jpg',
        siteUrl: siteUrl, // 页面路径
        logo: '',
        language: 'zh-CN',
        navigation: true, // 是否开启右侧导航
        subscribe: true, // 是否显示订阅按钮
    },
    mapping: {
        'MarkdownRemark.frontmatter.author': `AuthorJson`,
    },
    plugins: [
        {
            resolve: `gatsby-plugin-nprogress`,
            options: {
                color: `#f26a3d`,
                showSpinner: false,
            },
        },
        'gatsby-plugin-react-next',
        `gatsby-transformer-yaml`,
        `gatsby-transformer-json`,
        'gatsby-plugin-catch-links',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/author`,
                name: `author`,
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/static`,
                name: 'static',
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/blog`,
                name: 'blog',
            },
        },
        {
            resolve: 'gatsby-plugin-postcss-sass',
            options: {
                postCssPlugins: [autoprefixer()],
                precision: 8,
            },
        },
        'gatsby-plugin-catch-links',
        'gatsby-transformer-sharp',
        {
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: [
                    'gatsby-remark-numbered-footnotes',
                    // {
                    //     resolve: 'gatsby-remark-sequence-2',
                    //     options: {
                    //         'theme': 'simple', // simple, hand
                    //     }
                    // },
                    {
                        resolve: 'gatsby-remark-images',
                        options: {
                            linkImagesToOriginal: false,
                            maxWidth: 840,
                        }
                    },
                    {
                        resolve: `gatsby-remark-prismjs`,
                        options: {
                            classPrefix: 'language-',
                        },
                    },
                    {
                        resolve: 'gatsby-remark-emojis',
                        options: {
                            // Deactivate the plugin globally (default: true)
                            active: true,
                            // Add a custom css class
                            class: 'emoji-icon',
                            // Select the size (available size: 16, 24, 32, 64)
                            size: 64,
                            // Add custom styles
                            styles: {
                                display: 'inline',
                                margin: '0',
                                'margin-top': '1px',
                                position: 'relative',
                                top: '5px',
                                width: '25px'
                            }
                        }
                    },
                    {
                        resolve: 'gatsby-remark-embed-video',
                        options: {
                            width: 800,
                            ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
                            height: 400, // Optional: Overrides optional.ratio
                        }
                    },
                    'gatsby-remark-autolink-headers',
                    // 文件放在和文章同文件夹, 引入是别带"/", "./"等参数, 直接写名字
                    'gatsby-remark-copy-linked-files',
                    'gatsby-remark-katex',
                    'gatsby-remark-responsive-iframe',
                    {
                        resolve: 'gatsby-remark-external-links',
                        options: {
                            target: '_target',
                            rel: 'nofollow'
                        }
                    }
                ]
            }
        },
        'gatsby-plugin-sharp',
        {
            resolve: 'gatsby-plugin-feed',
            options: {
                query: `
                      {
                        site {
                          siteMetadata {
                            title
                            image_url: cover
                            description
                            language
                            siteUrl
                            site_url: siteUrl
                          }
                        }
                      }
                    `,
                // Setup an RSS object, merging on various feed-specific options.
                setup: ({ query: { site: { siteMetadata }, ...rest } }) => {
                    return {
                        ...siteMetadata,
                        ...rest,
                        feed_url: `${siteMetadata.siteUrl}/rss.xml`,
                    };
                },
                feeds: [
                    {
                        serialize: ({ query: { site, allMarkdownRemark } }) => (
                            allMarkdownRemark.edges.map(edge =>
                                Object.assign({}, edge.node.frontmatter, {
                                    description: edge.node.html,
                                    url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                                    guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                                    author: edge.node.frontmatter.author.id,
                                }))
                        ),
                        query: `
                              {
                                allMarkdownRemark(
                                  sort: { order: DESC, fields: [frontmatter___date] },
                                  filter: { frontmatter: { draft: { ne: true } } }
                                ) {
                                  edges {
                                    node {
                                      html
                                      excerpt(pruneLength: 260)
                                      fields {
                                        slug
                                      }
                                      frontmatter {
                                        title
                                        date
                                        categories: tags
                                        author {
                                            id
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            `,
                        output: '/rss.xml'
                    }
                ]
            }
        },
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: trackingId,
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: 'Attila',
                short_name: 'Attila',
                description: 'Thoughts, stories and ideas.',
                start_url: pathPrefix ? pathPrefix : '/',
                background_color: '#333F44',
                theme_color: '#333F44',
                orientation: 'portrait',
                display: 'standalone', // fullscreen, standalone, minimal-ui, browser
                icons: [
                    {
                        'src': `${pathPrefix}/favicons/favicon.png`,
                        sizes: '1024x1024',
                        type: 'image/png',
                    }
                ]
            },
        },
        'gatsby-plugin-offline',
        'gatsby-plugin-react-helmet',
    ],
};
