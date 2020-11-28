import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AddMatch(props) {
  const [open, setOpen] = React.useState(false);
  const [formState, setFormState] = React.useState({
    teamAName: '',
    teamBName: '',
    teamAHome: '',
    teamBHome: '',
    teamAScore: 0,
    teamBScore: 0,
    leauge: '',
    date: '',
    active: false,
  });

  const {
    teamAName,
    teamBName,
    teamAHome,
    teamBHome,
    teamAScore,
    teamBScore,
    leauge,
    date,
  } = formState;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = event => {
    setFormState(pre => ({ ...pre, [event.target.name]: event.target.value }));
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Match
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add new Match</DialogTitle>
        <DialogContent>
          Team A:
          <TextField
            id="teamAName"
            label="Name"
            type="text"
            name="teamAName"
            fullWidth
            margin="dense"
            value={teamAName}
            onChange={handleChange}
          />
          <TextField
            id="teamAHome"
            label="Home"
            type="text"
            name="teamAHome"
            fullWidth
            margin="dense"
            value={teamAHome}
            onChange={handleChange}
          />
          <TextField
            id="teamAScore"
            label="Team Score"
            type="number"
            name="teamAScore"
            fullWidth
            margin="dense"
            value={teamAScore}
            onChange={handleChange}
          />
        </DialogContent>

        <DialogContent>
          Team B:
          <TextField
            id="teamBName"
            label="Name"
            type="text"
            name="teamBName"
            fullWidth
            margin="dense"
            value={teamBName}
            onChange={handleChange}
          />
          <TextField
            id="teamBHome"
            label="Home"
            type="text"
            name="teamBHome"
            fullWidth
            margin="dense"
            value={teamBHome}
            onChange={handleChange}
          />
          <TextField
            id="teamBScore"
            label="Team Score"
            type="number"
            name="teamBScore"
            fullWidth
            margin="dense"
            value={teamBScore}
            onChange={handleChange}
          />
        </DialogContent>

        <DialogContent>
          Info:
          <TextField
            id="leauge"
            label="Leauge"
            type="text"
            name="leauge"
            fullWidth
            margin="dense"
            value={leauge}
            onChange={handleChange}
          />
          <TextField
            id="date"
            type="date"
            name="date"
            fullWidth
            margin="dense"
            value={date}
            onChange={handleChange}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleClose();
              props.addNewMatch(formState);
            }}
            color="primary"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
