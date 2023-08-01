import React from 'react';
import Address from './Address';
import Avatar from './Avatar';
import Description from './Description';
import Github from './Github';
import Twitter from './Twitter';
import Website from './Website';
import Email from './Email';
import Telegram from './Telegram';
import Discord from './Discord';
import Reddit from './Reddit';
// Import other components

const Tooltip = ({ data, config, position }) => {
        return ( <
                div className = "tooltip"
                style = {
                    {...config.tooltip, left: position.x, top: position.y } } > {
                    config.displayOptions.showAvatar && < Avatar src = { data.avatar }
                    styles = { config.avatar }
                    />} {
                        config.displayOptions.showAddress && < Address address = { data.address }
                        styles = { config.address }
                        />} {
                            config.displayOptions.showDescription && < Description description = { data.description }
                            styles = { config.description }
                            />} {
                                config.displayOptions.showGithub && < Github github = { data.github }
                                styles = { config.github }
                                />} {
                                    config.displayOptions.showTwitter && < Twitter twitter = { data.twitter }
                                    styles = { config.twitter }
                                    />} {
                                        config.displayOptions.showWebsite && < Website url = { data.url }
                                        styles = { config.website }
                                        />} {
                                            config.displayOptions.showEmail && < Email email = { data.email }
                                            styles = { config.email }
                                            />} {
                                                config.displayOptions.showTelegram && < Telegram telegram = { data.telegram }
                                                styles = { config.telegram }
                                                />} {
                                                    config.displayOptions.showDiscord && < Discord discord = { data.discord }
                                                    styles = { config.discord }
                                                    />} {
                                                        config.displayOptions.showReddit && < Reddit reddit = { data.reddit }
                                                        styles = { config.reddit }
                                                        />} { /* Render other components based on config */ } { /* ... */ } <
                                                        /div>
                                                    );
                                                };

                                                export default Tooltip;