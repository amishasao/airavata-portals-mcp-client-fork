import {SessionType} from "@/interfaces/SessionType.tsx";
import {Button, CloseButton, Dialog, Input, Portal, Text, useDialog} from "@chakra-ui/react";
import {useState} from "react";
import {toaster} from "@/components/ui/toaster.tsx";
import {CONTROLLER} from "@/lib/controller.ts";
import api from "@/lib/api.ts";

export const DeleteAllSessions = ({
                                    sessions,
                                    setSessions
                                  }: {
  sessions: SessionType[],
  setSessions: (sessions: SessionType[]) => void
}) => {
  const dialog = useDialog();
  const [loading, setLoading] = useState(false);
  const [deleteName, setDeleteName] = useState("");
  const handleDelete = async () => {
    setLoading(true);

    try {
      const ids = sessions.map(s => s.id);
      await api.delete(`${CONTROLLER.sessions}/delete/${ids.join(",")}`);
      setSessions([]);
    } catch {
      toaster.create({
        'title': 'Error',
        'description': 'Failed to delete all sessions',
        'type': 'error'
      })
    } finally {
      setLoading(false);
    }
  }
  return (
      <>
        <Dialog.RootProvider size="sm" value={dialog}>
          <Portal>
            <Dialog.Backdrop/>
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Delete All Sessions</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <Text color="gray.500">
                    This action is irreversible. To confirm, please type:{" "}
                    <b>delete all sessions</b>.
                  </Text>

                  <Input
                      mt={2}
                      placeholder="Session name"
                      value={deleteName}
                      onChange={(e) => setDeleteName(e.target.value)}
                  />
                </Dialog.Body>
                <Dialog.Footer>
                  <Button
                      width="100%"
                      colorPalette="red"
                      disabled={deleteName !== "delete all sessions" || loading}
                      loading={loading}
                      onClick={handleDelete}
                  >
                    Delete
                  </Button>
                </Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm"/>
                </Dialog.CloseTrigger>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.RootProvider>

        <Button
            colorPalette={'red'}
            loading={loading}
            onClick={() => dialog.setOpen(true)}
        >
          Delete All
        </Button>
      </>
  )
}