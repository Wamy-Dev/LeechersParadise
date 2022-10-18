import { createTheme, ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
const NewthemeDark = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#333333"
    },
    primary: {
      main: '#5E2BE2',
    },
    secondary: {
      main: '#50c878',
    },
    text: {
      primary: "#ffffff"
    },
  },
  typography: {
    fontFamily: [
      'Lato',
      'sans-serif',
    ].join(','),
  },
});
export default function Support() {
    return (
      <ThemeProvider theme={NewthemeDark}>
        <CssBaseline />
        <Box display="flex" justifyContent="center" minHeight="100vh">
        <div style={{paddingBottom: "40px", width: "100%", maxWidth: "1400px"}}>
        <div style={{textAlign: "center"}}>
        <h1>Contact</h1>
        </div>
        <div style={{paddingLeft: "10px", paddingRight: "10px"}}>
            <h3> For questions or concerns please send an email to <a style={{color: "white"}} href="mailto:contact@leechersparadise.com?subject=(Put%20your%20inquiry%20here)%20-%20(your%20username%2C%20name%20or%20alias)">contact@leechersparadise.com</a> or join our Discord and open a support ticket <a href="https://discord.gg/47SnjxgBFb" style={{ textDecoration: 'underline', color: "#5865F2"}}> Here</a>.</h3>
        </div>
        <div style={{textAlign: "center"}}>
        <h1>FAQ</h1>
        </div>
        <div style={{paddingLeft: "10px", paddingRight: "10px"}}>
            <h3> Why LeechersParadise? </h3>
            <p> Like a lot of my other piracy oriented projects such as <a style={{color: "white"}} href="https://rezi.one">Rezi</a>, I want to make things free and not have to pay a lot of money to companies who don't need it.
            LeechersParadise allows you to download hoster links and torrents without having to pay for a monthly subscription all for free and anonymously.</p>
            <Divider/>
            <h3> Is Premium required to use LeechersParadise? </h3>
            <p> No. LeechersParadise is a free project that allows any anonymous user to download any hoster link and torrent for free without charge. As a non-premium user, you are limited to 10 downloads every 24 hours.
                You can bypass this by purchasing a premium account for only $2 a month. This price is cheap and allows unlimited downloads. <strong>This subscription goes into supporting the project and crowdfunding the server costs and account
                costs.</strong> If you are interested you can purchase <Link style={{color: "#d4af37"}} to="/getpremium">here</Link>.
            </p>
            <Divider/>
            <h3> Who made LeechersParadise? </h3>
            <p> Hi there! I am <a style={{color: "white"}} href="https://github.com/Wamy-Dev">Wamy</a>, the sole developer of LeechersParadise! This project was originally started by another web developer but then I took over and I actively
                maintain the project now. I also am responsible for paying the bills and actively fixing bugs. Over the course of this project, there have been over 300 commits, and over 45 hours of active coding time put into this project.
                I actively strive to make this project as good and as usable as it can be! If you want to learn more about me, you can go to my personal website <a style={{color: "white"}} href="https://homeonacloud.com">here</a>.
            </p>
            <Divider/>
            <h3> What data do you collect? </h3>
            <p> LeechersParadise does not store any of the links you download. We do collect your IP for the 24 hours as that is how we track how many downloads you have. This is only stored every 24 hours that you use 
                the service. LeechersParadise is also backed by SimpleAnalytics as a way to view analytics for the website which is privacy oriented. You can read more about the SimpleAnalytics <a href="https://simpleanalytics.com" style={{color: "white"}}>here</a>.
                You can read LeechersParadise Privacy Policy <a style={{color: "white"}} href="/policies">here</a> along with the Terms and Conditions, Cookie Policy and Fair Use Policy.
            </p>
            <Divider/>
            <h3> Why does my link not work? </h3>
            <p> There are many reasons why a link may not work. The most common reason is that the hoster is not valid on our service and we cannot download it. You may use a different hoster or use a different service. Some hosters such as RapidGator or TurboBit are only allowed a certain
                download quota every 24 hours, so if it gives you an error, LeechersParadise has surpassed the quota. You can try again at a later time, or use a different hoster or different service. If you are using a torrent, it may be that the torrent is not valid or the tracker is down. 
            </p>
            <Divider/>
            <h3> My download stops midway or never even starts. </h3>
            <p> There are many reasons a download has stopped midway. Due to the way we serve files, our memory fills up and needs to be cleared once every 4 hours, and this kills all downloads in progress at that time, so if that happens, please just redownload again. The best solution for this problem in general is to just try again.
                If you are using a mobile device, LeechersParadise does not work very well with large files and mobile devices. Please use a PC or download smaller files. The best browser for iOS devices is Safari, for Android devices is Chrome. For PCs the best browser is Brave or Chrome and for Mac is Safari.
            </p>
            <Divider/>
            <h3> Can I download multiple links at the same time? </h3>
            <p> No. The web interface does not allow for downloading multiple links at the same time, even in different tabs. If you are a <Link style={{color: "#d4af37"}} to="/getpremium">premium member</Link> you have access to direct download links, which allow you to 
                use those generated links inside Jdownloader2, Internet Download Manager, PyLoad or other similar download managers. The button is available next to the normal download button and it will copy that link to your clipboard to be used elsewhere. The link is
                password protected and requires you to have a premium account to download. When asked for credentials, just use the same login that you do for the website. If you are not a premium member, you may sign up to gain this feature <Link style={{color: "#d4af37"}} to="/getpremium">here</Link>.
            </p>
            <Divider/>
            <h3> I get an error saying "Max downloads reached for this hoster" even though I am premium. Why? </h3>
            <p> Unfortunately, due to our debrid services, they place a limit on how much traffic can be used on each hoster. This serves as a sort of safety net for them, so they don't get banned. This means that since LeechersParadise 
              relies on these services, we have to play by their rules. LeechersParadise owns multiple debrid accounts to allow for the greatest amount of traffic availability. When one account runs out of traffic usage, we switch to the next
              one and so on until we have exhausted all accounts limits. Every 24 hours, the usage gets reset so it's not out forever. We are always expanding and getting more and more accounts as LeechersParadise grows.
            </p>
            <Divider/>
        </div>
        </div>
        </Box>
      </ThemeProvider>
    )
}