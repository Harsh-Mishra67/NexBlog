

// components
import Banner from "../banner/Banner";
import Categories from "./Categories";
import { Grid } from "@mui/material";
import Posts from "./post/Posts";
const Home = () => {
    return(
        <>
            <Banner />
            {/* parent grid is container and child grid is item */}
            <Grid container>
                <Grid item lg={2} sm={2} xs={12}>
                    <Categories/>
                </Grid>
                <Grid container item xs={12} sm={10} lg={10}>
                    <Posts/>
                </Grid>
            </Grid>
            {/* <Categories/> */}
        </>
    )
}
export default Home;