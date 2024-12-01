import React, { FC, useEffect, useState } from 'react';
import { TextField, Button, MenuItem, Container, Select, InputLabel, useTheme, Checkbox, Typography, Modal, Paper, CircularProgress } from '@mui/material';
import style from './style.module.scss';
import { getHalls } from '../../api/halls';
import { Event } from '../../models/event';
import { getEvents } from '../../api/events';
import { Hall } from '../../models/hall';

export const ReservationForm: FC = () => {
  const [hall, setHall] = useState<Hall | null>(null);
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('')
  const [guestsCount, setGuestsCount] = useState<number | null>(1);
  const [fullHall, setFullHall] = useState(false);
  const [event, setEvent] = useState<Event | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const theme = useTheme();

  const [halls, setHalls] = useState<Hall[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  const [open, setOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getHalls().then(setHalls);
    getEvents().then(setEvents);
  }, []);

  function changeHall(hall: Hall) {
    setHall(hall);
    setGuestsCount(1);
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <InputLabel id="select-hall-label">Зал</InputLabel>
        <Select
          required
          labelId='select-hall-label'
          variant='standard'
          value={hall?.id ?? ''}
          onChange={({ target: { value } }) => changeHall(halls.find(h => h.id === value)!)}
          sx={{
            '.MuiSelect-icon': {
              color: theme.palette.text.primary
            }
          }}
        >
          {halls.map(hall => <MenuItem key={hall.id} value={hall.id}>{hall.name}</MenuItem>)}
        </Select>
        <TextField
          required
          label="Дата"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          fullWidth
          margin="normal"
          sx={{
            '.MuiInputBase-input[value=""]::-webkit-datetime-edit-fields-wrapper': {
              display: 'none'
            },
            '.Mui-focused': {
              '.MuiInputBase-input::-webkit-datetime-edit-fields-wrapper': {
                display: 'block'
              },
            },
            '.MuiInputBase-input::-webkit-calendar-picker-indicator': {
              filter: 'invert()'
            }
          }}
        />
        <Container sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography>Время</Typography>
          <TextField
            required
            label="С"
            type='time'
            value={startTime}
            fullWidth
            onChange={({ target: { value } }) => setStartTime(value)}
            sx={{
              '.MuiInputBase-input[value=""]::-webkit-datetime-edit-fields-wrapper': {
                display: 'none'
              },
              '.Mui-focused': {
                '.MuiInputBase-input::-webkit-datetime-edit-fields-wrapper': {
                  display: 'block'
                },
              },
              '.MuiInputBase-input::-webkit-calendar-picker-indicator': {
                filter: 'invert()'
              }
            }}
          />
          <TextField
            required
            label="По"
            type='time'
            value={endTime}
            fullWidth
            onChange={({ target: { value } }) => setEndTime(value)}
            sx={{
              '.MuiInputBase-input[value=""]::-webkit-datetime-edit-fields-wrapper': {
                display: 'none'
              },
              '.Mui-focused': {
                '.MuiInputBase-input::-webkit-datetime-edit-fields-wrapper': {
                  display: 'block'
                },
              },
              '.MuiInputBase-input::-webkit-calendar-picker-indicator': {
                filter: 'invert()'
              }
            }}
          />
        </Container>
        <TextField
          label="Кол-во гостей"
          type="number"
          value={guestsCount}
          onChange={(e) => setGuestsCount(+e.target.value)}
          fullWidth
          margin="normal"
          slotProps={{
            htmlInput: {
              min: 1,
              max: hall ? hall.capacity : undefined
            }
          }}
          disabled={fullHall}
        />
        <Container sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
          <Typography>Бронировать зал</Typography>
          <Checkbox
            value={fullHall}
            onChange={({ target: { checked } }) => setFullHall(checked)}
          />
          <Typography>Событие</Typography>
          <Select
            value={event?.id ?? ''}
            onChange={({ target: { value } }) => setEvent(events.find(e => e.id === value) ?? null)}
            disabled={!fullHall}
            sx={{
              '.MuiSvgIcon-root': {
                color: theme.palette.text.primary
              }
            }}
          >
            <MenuItem key={0} value={0}><Button>Убрать</Button></MenuItem>
            {events.map(event => <MenuItem key={event.id} value={event.id}>{event.name}</MenuItem>)}
          </Select>
        </Container>
        <Button type="submit" variant="contained" color="primary">
          Забронировать
        </Button>
      </form>
      <Modal
        open={open}
        onClose={() => setOpen(true)}
        sx={{
          display: "flex",
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Paper sx={{ p: 5 }}>
          <Typography>Идет проверка возможности бронирования</Typography>
          {isLoading && <CircularProgress />}
          <Button onClick={() => setOpen(false)}>Закрыть</Button>
        </Paper>
      </Modal>
    </Container>
  );
}