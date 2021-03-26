import React from 'react';
import '../interface/css/docs.scss';

import Primary from '../components/docs/primary';
import Secondary from '../components/docs/secondary';
import Paragraph from '../components/docs/paragraph';
import Table from '../components/docs/table';
import Link from '../components/docs/link';

export default () => { return (
   <div id={ 'docs' }>
      <div id={ 'inner' }>
         <Primary header={ 'Introduction' } id={ 'intro' }>
            <Paragraph>
               Greetings! This is a web-based quest helper for Vanilla/Classic World of Warcraft. The application takes a <Link header={ 'handwritten JSON file' } url={ 'https://github.com/wickstjo/vanilla-questing/blob/master/src/routes/alliance/human.json' } /> (that contains a route) and parses it to an easy to follow guide with dynamically rendered maps, directions and objective/quest logs.
            </Paragraph>
            <Paragraph>
               It was originally intended for quest routing in mind, but can be used for anything map and coordinate related and uses the same metrics that the game does. The route files were designed with flexibility and precision in mind so even large sweeping changes are easy to implement while machine auditing makes sure that every quest has an appropriate start and conclusion.
            </Paragraph>
            <Paragraph>
               Consider this manifesto a more broad introduction with the service. For more technical information about routing and code, check out the <Link header={ 'readme section on github' } url={ 'https://github.com/wickstjo/vanilla-questing' } />!
            </Paragraph>
            <Secondary header={ 'Design Philosophy' } id={ 'design' }>
               <Paragraph>
                  Leveling efficiently from start to finish involves you completing 850-900 unique quests with weird interconnected requirements and is above everything else, a marathon. Contrary to popular belief, there are plenty of quests available but they need to be completed in a rough sequence in order to unlock a sufficient amount simultaneously that then can be completed with a few efficient loops around the zone.
               </Paragraph>
               <Paragraph>
                  Whether you’re planning on playing every waking hour or not, having a thought through plan and therefore being able to schedule very contested zones like STV outside of your servers primetime will likely cut your leveling time in half.
               </Paragraph>
            </Secondary>
            <Secondary header={ 'Volatility at Low Levels' } id={ 'volatility' }>
               <Paragraph>
                  The lower level you are, the easier it is to accidentally outlevel content and royally screw yourself and have no other recourse than grinding monsters for experience. Just because a quest is available doesn’t mean it should be on your direct agenda.
               </Paragraph>
               <Paragraph>
                  Zones tend to be divided into 1-3 sectors with very different level ranges and you should wait until you have a critical mass of quests for a specific sector in order to not have to make the time consuming trip multiple times. People who fully complete the closest available zone will shoot up in levels at the start, but rest assured that they will peak before duskwood and likely stop playing entirely because they ran out of quests everywhere.
               </Paragraph>
            </Secondary>
            <Secondary header={ 'Skipping Content' } id={ 'skipping' }>
               <Paragraph>
                  Skipping quests for reasons that are in your control is a bad idea. There’s a plethora of wonky and awkward quests in Vanilla but skipping too many of them just because you don’t like them adds up over time. Quests and zones that are universally liked are always either occupied or terrorized (think pirates in Tanaris) and going there might be a complete waste of your time. On live servers you’ll run into this issue all the time and want to have a safetynet in order to not miss experience breakpoints. Attempt everything once and evaluate your situation when a problem arises.
               </Paragraph>
            </Secondary>
            <Secondary header={ 'Grouping is Fun' } id={ 'grouping' }>
               <Paragraph>
                  Being penalized while grouping used to be the norm and something only those with tons of rested experience could partake in. Quest items aren’t shared between party members so those should always be completed alone, but for kill quests I  would go as far as to even suggest partying. You’ll be clearing zones so thoroughly that the reduction in experience from kills every now and then won’t come close to the gains you’ll make from smashing through kill quests quicker.
               </Paragraph>
            </Secondary>
            <Secondary header={ 'Focusing on Reputation' } id={ 'reputation' }>
               <Paragraph>
                  Quests that award reputation have very harsh diminishing returns and should therefore be completed while you’re within level range. Starting zones grant a massive amount of reputation so players who don’t want to spend gold on runecloth should migrate to the correct factions starting area immediately. Humans gain 10% more reputation than others and have a very real chance of reaching exalted before level 40.
               </Paragraph>
               <Paragraph>
                  As a disclaimer to all the private server human players that are set on reaching exalted with another faction before level 40: The reputation rewards on the Classic client are significantly lower than we’re used to. Do not gimp your leveling route and expect to be exalted by 40.
               </Paragraph>
            </Secondary>
         </Primary>
         <Primary header={ `Features` } id={ `features` }>
            <Paragraph>
               The entire application is written in React and hosted via Github pages. The route files are very self explanatory and you don't need to be a programmer to write one yourself. Everything is open-source and viewable from the <Link header={ 'github repository' } url={ 'https://github.com/wickstjo/vanilla-questing' } />. There are no backend components or cookies being used.
            </Paragraph>
            <Secondary header={ `Saving Your Progress` } id={ `storage` }>
               <Paragraph>
                  There is no traditional backend component like a database for storage. Everything runs locally and your profiles are saved to your <Link header={ 'browsers localstorage' } url={ 'https://blog.logrocket.com/the-complete-guide-to-using-localstorage-in-javascript-apps-ba44edb53a36' } />. The string is only a few kilobytes in size and snapshots your character progress, which the application then parses, uses and updates. Only you have access to this information.
               </Paragraph>
            </Secondary>
            <Secondary header={ `Smaller Devices` } id={ `smaller-devices` }>
               <Paragraph>
                  The application is designed to be used on a desktop but should stretch and function normally on any device with a reasonable resolution. When the resolution changes or you browse to another block, the map will automatically center around the average coordinate. I suggest dedicating half of your monitor to the application and half to youtube/twitch or whatever your preferred distraction is.
               </Paragraph>
            </Secondary>
            <Secondary header={ `Custom Routes` } id={ `custom-routes` }>
               <Paragraph>
                  Everything has been built with flexibility in mind and virtually anything that’s map related can be written and rendered. If you want to write custom mining or herbing routes and only share them with your friends then go right ahead.
               </Paragraph>
               <Paragraph>
                  Assembling all the correct quest IDs is obnoxious and has been streamlined for you so that the application appends on the correct IDs depending on which faction you pick. If something is missing, message me and I'll fix it. If your route isn't quest related, your faction makes no difference.
               </Paragraph>
            </Secondary>
            <Secondary header={ `Preloading Backgrounds` } id={ `preloading` }>
               <Paragraph>
                  Loading images of zones is the most bandwidth intense part of the ordeal. They’re around 2.5MB in size each and there’s around 45 zones in total. Google Chrome is decent at caching and remembering data that you’ve viewed before, but Firefox refuses to do it. While I look into finding a fix for Firefox, consider using Chrome and preloading everything if the “flickering” becomes annoying and your download speed isn’t absurd.
               </Paragraph>
            </Secondary>
            <Secondary header={ `Key Bindings` } id={ `bindings` }>
               <Paragraph>
                  For browsing back and forward, you can choose between using <i>A and D</i> or the <i>Arrowkeys</i>. To quickly open the reference overview, use <i>Q</i>. To close any prompt, use <i>Escape</i>. You can change these freely from the settings menu.
               </Paragraph>
            </Secondary>
            <Secondary header={ `Reducing Pickup Time` } id={ `questie` }>
               <Paragraph>
                  It’s very hard to indicate where exactly the quests I want you to pick up are in hubs like Lakeshire that contains a multitude of both high and low level quests in close proximity. I suggest using the <Link header={ 'ingame addon Questie' } url={ 'https://willitclassic.com/view/zN3cdlIhnmtCjOwOnH8q' } /> to get minimap markers in order to speed up the process of picking up and returning the correct quests with minimal downtime. Try the following questie configs:
               </Paragraph>
               <Paragraph>
                  /questie setminlevel 15<br />
                  /questie resizemap
               </Paragraph>
            </Secondary>
            <Secondary header={ `Direct Linking` } id={ `linking` }>
               <Paragraph>
                  After you hit the blue link button in the sidepanel, your clipboard will contain a direct link to the current page/build you're viewing. This is quite handy when you want to communicate your current status to a friend or perhaps show them where a certain questline starts. For people who switch computers a lot you might want to bookmark your progress rather than dealing with profiles since modern browsers tend to sync with a cloud and bookmarks are saved. Providing a link to the page you’re viewing also makes reporting bugs a lot easier.
               </Paragraph>
            </Secondary>
         </Primary>
         <Primary header={ `Contribute` } id={ `contribute` }>
            <Paragraph>
               If you have ideas on how the project could be improved, feel free to make pull requests on GitHub or contact me directly via your preferred medium. The same thing applies to route related bugs/ideas, but to make things easier for both of us, read the "direct linking" header and provide me with a link ontop of a brief explanation of the issue.
            </Paragraph>
            <Secondary header={ `Donations` } id={ `monetary` }>
               <Paragraph>
                  If you feel like the project has saved you time, any and all <Link header={ 'monetary contributions via PayPal' } url={ 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=LNLHSGMLKXL74&source=url' } /> are greatly appreciated. Thank you to all the generous people who have already donated!
               </Paragraph>
            </Secondary>
            <Secondary header={ `Contact Me` } id={ `contact` }>
               <Table data={[
                  ['PayPal', <Link header={ 'Jfwick@gmail.com' } url={ 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=LNLHSGMLKXL74&source=url' } />],
                  ['Discord', 'Strafir#9133'],
                  ['BattleNet', 'Strafir#2132'],
                  ['Reddit', <Link header={ 'Wickstjo' } url={ 'https://www.reddit.com/user/wickstjo/' } />],
                  ['GitHub', <Link header={ 'Wickstjo' } url={ 'https://github.com/wickstjo' } />],
                  ['Shazzrah', 'Strafir / Strafirz']
               ]}/>
            </Secondary>
         </Primary>
         <Primary header={ `Credits` } id={ `credits` }>
            <Paragraph>
               Open source projects are the lifeblood of innovation, because they can be learned from and improved upon over time. Single man projects like this benefit greatly from outside contributors with different skill sets and help everything come together. I want to thank the following people for making their work public and encourage you to check out what else they have available:
            </Paragraph>
            <Secondary header={ `The Boys` } id={ `backgrounds` }>
               <Table data={[
                  ['Teeb', <Link header={ 'WC3 Icons @ Barrens.chat' } url={ 'https://barrens.chat/viewtopic.php?f=5&t=901' } />],
                  ['Athena', <Link header={ 'Remastered Zone Backgrounds @ Reddit thread' } url={ 'https://www.reddit.com/r/classicwow/comments/bwqzql/here_have_some_upscaled_highresolution_wow_maps/' } />],
                  ['Vrty', <Link header={ 'Sidepanel Icons @ Reddit' } url={ 'https://www.reddit.com/user/Vrty' } />],
                  ['Shagu', <Link header={ 'Localized Databases @ pfQuest' } url={ 'https://shagu.org/pfQuest/' } />],
               ]}/>
            </Secondary>
         </Primary>
      </div>
   </div>
)}