import React from "react";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { fetchActivities } from "../../store/ActivitiesSlice/activitiesSlice";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

const ActivitiesPage = () => {

  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const { user, fethcUserStatus } = useAppSelector((state) => state.user);

  React.useEffect(() => { }, [user]);

  const [value, setValue] = React.useState(0);

  const dispatch = useAppDispatch();

  const { Activities } = useAppSelector((state) => state.activities);
  React.useEffect(() => {

  }, [Activities]);

  React.useEffect(() => {
    dispatch(fetchActivities());
  }, []);


  return <div>
    <div>
      <Stack spacing={2} sx={{ width: 300 }}>
        <Autocomplete
          id="free-solo-demo"
          freeSolo
          options={Activities && Activities?.map((option) => option.title) || []}
          renderInput={(params) => <TextField {...params} label="Поиск" />}
        />
      </Stack>

    </div>
    <div>
      {Activities && Activities?.map((row) => (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography> {row.title}</Typography>
            <Typography sx={{ color: 'text.secondary' }}>{row.date}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            {row.description}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  </div>;
};

export default ActivitiesPage;
