import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Badge from "@material-ui/core/Badge";

const useStyles = makeStyles( (theme) => ({
    root: {
        minWidth: 200,
        marginBottom: "25px",
    },
    content: {
        display: "flex",
        justifyContent: 'space-between',
        alignItems: "center"
    },
    title: {
        [theme.breakpoints.down('xs')] : {
            fontSize: "1rem",
            paddingRight: "10px"
        }
    }
}));

export const User = ({username, id, isActive}) => {
    const classes = useStyles();

    return (
        <Card className={classes.root} elevation={2}>
            <CardContent className={classes.content}>
                <Box>
                    <Typography className={classes.title} variant={"h6"} color="textPrimary" gutterBottom>
                        ID: {id}
                    </Typography>
                    <Typography className={classes.title} variant={"h6"} color="textSecondary" gutterBottom>
                        Username: {username}
                    </Typography>
                </Box>
                <Box>
                    <Badge color="secondary" variant="dot" invisible={!isActive} >
                        {isActive ? "Active" : "Not active"}
                    </Badge>
                </Box>
            </CardContent>
        </Card>
    );
};