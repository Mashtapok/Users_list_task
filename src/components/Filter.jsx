import React from "react";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from '@material-ui/core/styles';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(2),
            minWidth: '25ch',
            verticalAlign: "baseline",
            [theme.breakpoints.down('xs')]: {
                margin: 0,
                marginBottom: "15px"
            },
        },
    },
}));

export const Filter = ({increaseSortHandler, decreaseSortHandler,defaultSortHandler, active}) => {
    const classes = useStyles();

    const classNameInc = (active==="increase") ? 'active': "";
    const classNameDef = (active==="default") ? 'active': "";
    const classNameDec = (active==="decrease") ? 'active': "";

    return (
        <div className={classes.root}>
            <TextField placeholder="Username"
                       id="standard-search" label="Search"
                       type="search"

            />
            <ButtonGroup size="small" color="primary" aria-label="small outlined primary button group">
                <Button className={classNameInc} onClick={() => increaseSortHandler()}>По возрастанию</Button>
                <Button className={classNameDef} onClick={() => defaultSortHandler()}>Стандартный</Button>
                <Button className={classNameDec} onClick={() => decreaseSortHandler()}>По убыванию</Button>
            </ButtonGroup>
        </div>
    );
};