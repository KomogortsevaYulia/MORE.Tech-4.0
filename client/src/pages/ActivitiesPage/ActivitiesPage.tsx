import React from "react";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { fetchActivities } from "../../store/ActivitiesSlice/activitiesSlice";

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
    console.log(Activities);
  }, [Activities]);

  React.useEffect(() => {
    dispatch(fetchActivities());
  }, []);


  return <div>
    {Activities && Activities?.map((row) => (
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            {row.title}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>{row.date}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          {row.description}
          </Typography>
        </AccordionDetails>
      </Accordion>
    ))}



  </div>;
};

export default ActivitiesPage;
