import React from "react";
import {makeStyles} from "@material-ui/styles";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Box from "@material-ui/core/Box";
import Badge from "@material-ui/core/Badge";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        marginBottom: "25px",
    },
    content: {
        display: "flex",
        justifyContent: 'space-between',
        alignItems: "center"
    },
});

export const User = ({username, id, isActive, firstName, lastName}) => {
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